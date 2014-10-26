(function(){
    we.cell = {};

    we.cell.selectionAll = 0;
    we.cell.selectionRow = 0;
    we.cell.selectionCol = 0;

    we.cell.onSelection = false;
    we.cell.onSelectionRow = false;

    we.cell.selectionChange = function(grid) {
        var startRow = we.sheet.selectionStart.id.split('-').reverse()[1],
            startCol = we.sheet.selectionStart.id.split('-').reverse()[0],
            endRow = we.sheet.selectionEnd.id.split('-').reverse()[1],
            endCol = we.sheet.selectionEnd.id.split('-').reverse()[0],
            maxRow = we.core.max(+startRow, +endRow),
            minRow = we.core.min(+startRow, +endRow),
            maxCol = we.core.max(+startCol, +endCol),
            minCol = we.core.min(+startCol, +endCol);

        we.sheet.selectionClear();

        for(var i = minRow; i <= maxRow; i++){
            for(var j = minCol; j <= maxCol; j++){
                var selItems = we.dom.getElement('we-input-' + grid.sheet + '-' + i + '-' + j);
                we.dom.addClass(selItems, 'we-cell-input-active');
                we.sheet.selection.push(selItems);
            }
        }
    };

    we.cell.selectionChangeRow = function(grid) {
        var startRow = we.sheet.selectionStart.id.split('-').reverse()[1],
            endRow = we.sheet.selectionEnd.id.split('-').reverse()[1],
            minRow = we.core.min(+startRow, +endRow),
            maxRow = we.core.max(+startRow, +endRow);

        we.sheet.selectionClear();

        for(var i = minRow; i <= maxRow; i++){
            var elem = we.dom.getElement('we-cell-' + grid.sheet + '-' + i + '-' + 0),
                selItems = we.core.findClassInArray('head', elem, grid.rowArr).items,
                len = selItems.length;

            for(var j = 0; j < len; j++){
                we.dom.addClass(selItems[j], 'we-cell-input-active');
                we.sheet.selection.push(selItems[j]);
            }
        }
    };

    we.cell.insertTo = function(grid, row, config) {
        var cell = we.dom.create('td', {
                id: config.id,
                className: 'we-cell',
                index: 0,
                renderTo: row
            }),
            isRow = false,
            isCol = false;

        if(config.row === 0 && config.col === 0){
            cell.className = 'we-cell-main';
            grid.all = [];
            cell.onclick = function() {
                we.sheet.selectionClear();
                var len = grid.all.length;
                we.sheet.selection = grid.all;
                for(var i = 0; i < len; i++){
                    we.dom.addClass(grid.all[i], 'we-cell-input-active');
                }
            };
        } else if (config.col === 0){
            cell.className = 'we-cell-row-head';
            cell.innerHTML = 'R' + config.row;
            we.rows.currentRowHead = cell;
            cell.onmousedown = function(){
                we.sheet.selectionClear();
                var selItems = we.core.findClassInArray('head', this, grid.rowArr).items,
                    len = selItems.length;

                for(var i = 0; i < len; i++){
                    we.dom.addClass(selItems[i], 'we-cell-input-active');
                    we.sheet.selection.push(selItems[i]);
                }

                we.sheet.selectionStart = this;
                we.cell.onSelectionRow = true;
            };

            cell.onmouseup = function(){
                we.cell.onSelectionRow = false;
            };

            cell.onmouseover = function(){
                if(we.cell.onSelectionRow) {
                    console.log('Hello!');
                    we.sheet.selectionEnd = this;
                    we.cell.selectionChangeRow(grid);
                }
            };
        } else if (config.row === 0) {
            cell.className = 'we-cell-col-head';
            cell.innerHTML = 'C' + config.col;
            cell.onclick = function(){
                we.sheet.selectionClear();
                var selItems = we.core.findClassInArray('head', this, grid.colArr).items,
                    len = selItems.length;

                for(var i = 0; i < len; i++){
                    we.dom.addClass(selItems[i], 'we-cell-input-active');
                    we.sheet.selection.push(selItems[i]);
                }
            };
        }

            if (config.addInput){
                var input = we.dom.create('input', {
                    id: config.inputId,
                    type: 'text',
                    className: 'we-cell-input',
                    grid: grid,
                    onclick: function(){

                    },
                    onmousedown: function() {
                        we.sheet.selectionClear();
                        we.dom.addClass(this, 'we-cell-input-active');
                        we.sheet.selection.push(this);
                        we.doc.formulaField.value = this.value;

                        we.sheet.selectionStart = this;
                        we.cell.onSelection = true;
                    },
                    onmouseup: function() {
                        we.cell.onSelection = false;
                    },

                    onmouseover: function() {
                        if(we.cell.onSelection) {
                            we.sheet.selectionEnd = this;
                            we.cell.selectionChange(this.grid);
                        }
                    },

                    ondblclick: function(){
                        this.readOnly = false;
                        we.dom.addClass(this, 'we-cell-input-oninput')
                    },
                    onblur: function(){
                        this.readOnly = true;
                    },
                    oninput: function(){
                        we.doc.formulaField.value = this.value;
                    },
                    readOnly: true,
                    renderTo: cell
                });

                we.rows.currentRow.push(input);
                grid.all.push(input);
            }
    };
})()