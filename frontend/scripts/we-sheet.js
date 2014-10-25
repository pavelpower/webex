(function(){
    we.sheet = {};
    we.sheet.count = 0;
    we.sheet.items = [];
    we.sheet.active = {};
    we.sheet.colsCount = 26;
    we.sheet.rowsCount = 100;

    we.sheet.selection = [];
    we.sheet.selectionClear = function () {
        var len = we.sheet.selection.length;

        for(var i = 0; i < len; i++){
            we.sheet.selection[i].className = 'we-cell-input';
        }

        we.sheet.selection = [];
    };

    we.sheet.items.clear = function(){
        we.dom.removeClass(we.sheet.active.label, 'we-grid-sheet-label-active');
        we.dom.removeClass(we.sheet.active.body, 'we-grid-sheet-body-active');
    };

    we.sheet.create = function(newSheet){
        var sheetBody = we.dom.document.createElement('div'),
            sheetLabel = we.dom.document.createElement('div'),
            grid = we.dom.document.createElement('table');

        for(var i = 0; i < we.sheet.rowsCount; i++){
            var row = grid.insertRow(0);
            row.id = 'we-row-' + we.sheet.count + '-' + (we.sheet.rowsCount - i);
            row.className = 'we-row';

            for(var j = 0; j < we.sheet.colsCount; j++){
                var cell = row.insertCell(0);
                cell.id = 'we-cell-' + we.sheet.count + '-' + (we.sheet.rowsCount - i) + '-' + (we.sheet.colsCount - j - 1);
                if(j === (we.sheet.colsCount - 1)){
                    cell.className = 'we-cell-head';
                    cell.innerHTML = (we.sheet.rowsCount - i);
                } else{
                    cell.className = 'we-cell';
                    var input = we.dom.document.createElement('input');
                    input.type = 'text';
                    input.className = 'we-cell-input';
                    input.id = 'we-cell-input-' + we.sheet.count + '-' + (we.sheet.rowsCount - i) + '-' + (we.sheet.colsCount - j - 1);
                    input.readOnly = true;

                    input.onclick = function (){
                        we.sheet.selectionClear();

                        we.dom.addClass(this, 'we-cell-input-active');

                        we.sheet.selection.push(this);
                    };
                    input.ondblclick = function() {
                        this.readOnly = false;

                        this.className = 'we-cell-input we-cell-input-oninput';
                    };
                    input.onblur = function(){
                        this.readOnly = true;
                    };

                    cell.appendChild(input);
                }
            }
        }

        we.sheet.count++;

        grid.className = 'we-grid-sheet-body-grid';
        sheetBody.className = 'we-grid-sheet-body';
        sheetLabel.className = 'we-grid-sheet-label';
        sheetLabel.textContent  = 'Sheet' + we.sheet.count;

        sheetBody.id = 'we-sheet-body-' + we.sheet.count;
        sheetLabel.id = 'we-sheet-label-' + we.sheet.count;
        grid.id = 'we-sheet-body-grid-' + we.sheet.count;
        sheetBody.innerHTML = we.sheet.count;

        if(we.sheet.count === 1) {
            we.sheet.active.label = sheetLabel;
            we.sheet.active.body = sheetBody;

            we.dom.addClass(we.sheet.active.label, 'we-grid-sheet-label-active');
            we.dom.addClass(we.sheet.active.body, 'we-grid-sheet-body-active');
        }

        newSheet.id = we.sheet.count;
        newSheet.label = sheetLabel;
        newSheet.body = sheetBody;
        newSheet.grid = grid;

        sheetLabel.onclick = function(){
            var currentId = this.id.split('-').reverse()[0];

            we.sheet.items.clear();

            we.sheet.active.label = this;
            we.sheet.active.body = we.general.getElement('we-sheet-body-' + currentId);

            we.dom.addClass(we.sheet.active.label, 'we-grid-sheet-label-active');
            we.dom.addClass(we.sheet.active.body, 'we-grid-sheet-body-active');

            we.general.getElement('we-sheet-body-' + currentId).className += ' we-grid-sheet-body-active';
        };

        sheetBody.appendChild(grid);
        we.doc.docLayout.appendChild(sheetBody);
        we.doc.docFooter.insertBefore(sheetLabel, we.general.getElement('we-sheet-add-button'));
    };

    we.sheet.add = function(){
        var newSheet = {};
        we.sheet.items.push(newSheet);
        we.sheet.create(newSheet);
    };

})()