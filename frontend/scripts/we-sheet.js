(function(){
    we.core.loadModule('../scripts/we-row.js');
    we.core.loadModule('../scripts/we-col.js');
    we.core.loadModule('../scripts/we-cell.js');

    we.sheet = {};
    we.sheet.count = 0;
    we.sheet.items = [];
    we.sheet.active = {};

    we.sheet.colsCount = 26;

    we.sheet.selectionStart = null;
    we.sheet.selectionEnd = null;

    we.sheet.contextmenu = null;
    we.sheet.contextmenuClear = function(){
        if(we.sheet.contextmenu){
            we.sheet.contextmenu.linkToParent.onContextMenu = false;
            we.sheet.contextmenu.remove();
            we.sheet.contextmenu = null;
        }
    };

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

    we.sheet.selectionClean = function(){
        var len = we.sheet.selection.length;

        for(var i = 0; i < len; i++){
            we.sheet.selection[i].value = '';
        }
    };

    we.sheet.colsFind = function(grid){
        for(var i = 1; i < we.cols.count; i++){
            var arr = [];

            for(var j = 1; j < we.rows.count; j++){
                arr.push(we.dom.getElement('we-input-' + grid.sheet + '-' + j + '-' + i));
            }

            grid.colArr.push({
                id: i,
                head: we.dom.getElement('we-cell-' + grid.sheet + '-0-' + i),
                items: arr
            });
        }
    };

    we.sheet.delete = function(sheet){
        var len = we.sheet.items.length;

        for(var i = 0; i < len; i++){
            if(we.sheet.items[i].grid === sheet) {
                we.sheet.items[i].grid.remove();
                we.sheet.items[i].label.remove();
                we.sheet.items[i].body.remove();

                we.sheet.items = we.core.array.deleteItem(we.sheet.items, i);

                we.sheet.contextmenuClear();
                return;
            }
        }
    };

    we.sheet.getTopRightNextSelectedCell = function(){
        var selected = we.sheet.selection,
            len = selected.length,
            minRow = we.rows.count,
            maxCol = 0,
            tmpRow = null,
            tmpCol = null,
            sheet = null,
            parseArr = [],
            nextId = 'we-input-',
            nextElem = null;

        for(var i = 0; i < len; i++){
            parseArr = selected[i].id.split('-').reverse();
            tmpRow = parseArr[1];
            tmpCol = parseArr[0];
            sheet = parseArr[2];

            if(tmpRow < minRow) minRow = tmpRow;

            if(tmpCol > maxCol) maxCol = tmpCol;
        }

        nextId += sheet + '-' + ((minRow > 1 ? minRow - 1 : minRow)) + '-' + (maxCol);
        nextElem = we.dom.getElement(nextId);
    };

    we.sheet.upArrowDown = function(){
        var selected = we.sheet.selection,
            len = selected.length,
            minRow = we.rows.count,
            maxCol = 0,
            tmpRow = null,
            tmpCol = null,
            sheet = null,
            parseArr = [],
            nextId = 'we-input-',
            nextElem = null;

        for(var i = 0; i < len; i++){
            parseArr = selected[i].id.split('-').reverse();
            tmpRow = +parseArr[1];
            tmpCol = +parseArr[0];
            sheet = +parseArr[2];

            if(tmpRow < minRow) minRow = tmpRow;

            if(tmpCol > maxCol) maxCol = tmpCol;
        }

        nextId += sheet + '-' + ((minRow > 1 ? minRow - 1 : minRow)) + '-' + (maxCol);
        nextElem = we.dom.getElement(nextId);

        we.sheet.selectionClear();

        we.dom.addClass(nextElem, 'we-cell-input-active');

        we.sheet.selection.push(nextElem);

        we.cell.setSheetMenu(nextElem.customStyle);
    };

    we.sheet.downArrowDown = function(){
        var selected = we.sheet.selection,
            len = selected.length,
            minRow = we.rows.count,
            maxCol = 0,
            tmpRow = null,
            tmpCol = null,
            sheet = null,
            parseArr = [],
            nextId = 'we-input-',
            nextElem = null;

        for(var i = 0; i < len; i++){
            parseArr = selected[i].id.split('-').reverse();
            tmpRow = +parseArr[1];
            tmpCol = +parseArr[0];
            sheet = +parseArr[2];

            if(tmpRow < minRow) minRow = tmpRow;

            if(tmpCol > maxCol) maxCol = tmpCol;
        }

        nextId += sheet + '-' + ((minRow >= we.rows.count - 1 ? minRow : +minRow + 1)) + '-' + (maxCol);

        nextElem = we.dom.getElement(nextId);

        we.sheet.selectionClear();

        we.dom.addClass(nextElem, 'we-cell-input-active');

        we.sheet.selection.push(nextElem);

        we.cell.setSheetMenu(nextElem.customStyle);
    };

    we.sheet.leftArrowDown = function() {
        var selected = we.sheet.selection,
            len = selected.length,
            minRow = we.rows.count,
            maxCol = 0,
            tmpRow = null,
            tmpCol = null,
            sheet = null,
            parseArr = [],
            nextId = 'we-input-',
            nextElem = null;

        for(var i = 0; i < len; i++){
            parseArr = selected[i].id.split('-').reverse();
            tmpRow = +parseArr[1];
            tmpCol = +parseArr[0];
            sheet = +parseArr[2];

            if(tmpRow < minRow) minRow = tmpRow;

            if(tmpCol > maxCol) maxCol = tmpCol;
        }

        nextId += sheet + '-' + (minRow) + '-' + (maxCol >= we.cols.count - 1 ? maxCol : +maxCol + 1);

        nextElem = we.dom.getElement(nextId);

        we.sheet.selectionClear();

        we.dom.addClass(nextElem, 'we-cell-input-active');

        we.sheet.selection.push(nextElem);

        we.cell.setSheetMenu(nextElem.customStyle);
    };

    we.sheet.rightArrowDown = function(){
        var selected = we.sheet.selection,
            len = selected.length,
            minRow = we.rows.count,
            maxCol = 0,
            tmpRow = null,
            tmpCol = null,
            sheet = null,
            parseArr = [],
            nextId = 'we-input-',
            nextElem = null;

        for(var i = 0; i < len; i++){
            parseArr = selected[i].id.split('-').reverse();
            tmpRow = +parseArr[1];
            tmpCol = +parseArr[0];
            sheet = +parseArr[2];

            if(tmpRow < minRow) minRow = tmpRow;

            if(tmpCol > maxCol) maxCol = tmpCol;
        }

        nextId += sheet + '-' + (minRow) + '-' + (maxCol > 1 ? +maxCol - 1 : maxCol);

        nextElem = we.dom.getElement(nextId);

        we.sheet.selectionClear();

        we.dom.addClass(nextElem, 'we-cell-input-active');

        we.sheet.selection.push(nextElem);

        we.cell.setSheetMenu(nextElem.customStyle);
    };

    we.sheet.create = function(newSheet){
        we.sheet.count++;
        var addButton = we.dom.getElement('we-sheet-add-button'),
            sheetBody = we.dom.create('div', {
                id: 'we-sheet-body-' + we.sheet.count,
                className: 'we-grid-sheet-body',
                renderTo: we.doc.docLayout
            }),
            sheetLabel = we.dom.create('div', {
                id: 'we-sheet-label-' + we.sheet.count,
                className: 'we-grid-sheet-label',
                textContent: 'Sheet' + we.sheet.count,
                onContextMenu: false,
                onclick: function() {
                    var currentId = this.id.split('-').reverse()[0];

                    we.sheet.items.clear();
                    we.sheet.active.label = this;
                    we.sheet.active.body = we.dom.getElement('we-sheet-body-' + currentId);
                    we.dom.addClass(we.sheet.active.label, 'we-grid-sheet-label-active');
                    we.dom.addClass(we.sheet.active.body, 'we-grid-sheet-body-active');
                },
                oncontextmenu: function(e){
                    if(this.onContextMenu) {
                        console.log('There is already contextmenu exist!');
                    } else {
                        if(we.sheet.contextmenu) {
                            we.sheet.contextmenuClear();
                        }

                        var contextmenu = we.dom.create('div', {
                                className: 'we-sheet-label-contextmenu',
                                linkToParent: this,
                                renderTo: we.dom.body
                            });

                        contextmenu.style.position = 'absolute';
                        contextmenu.style.left = e.x + 'px';
                        contextmenu.style.top = e.y - 150 + 'px';

                        we.core.msg.contextmenu.create({
                            renderTo: contextmenu,
                            items: [
                                {
                                    type: 'colorPicker',
                                    isDialog: false,
                                    label: 'Label color',
                                    config: {
                                        label: 'Sheet label color:'
                                    }
                                },
                                {
                                    type: 'changeName',
                                    isDialog: false,
                                    label: 'Sheet name',
                                    config: {
                                        label: 'Sheet name:'
                                    }
                                },
                                {
                                    type: 'deletion',
                                    isDialog: true,
                                    label: 'Delete',
                                    config: {
                                        params: {
                                            title: 'Delete sheet',
                                            text: 'All data will be removed! Do you want to continue?'
                                        },
                                        events: {
                                            accept: function(){
                                                console.log('User accepted deletion!');
                                                we.sheet.delete(grid);
                                            },
                                            decline: function(){
                                                console.log('User declined deletion!');
                                            },
                                            cancel: function(){
                                                console.log('User canceled deletion!');
                                            }
                                        }
                                    }
                                }
                            ]
                        });

                        this.onContextMenu = true;
                        we.sheet.contextmenu = contextmenu;
                    }

                    e.preventDefault();
                },
                renderTo: we.doc.docFooter,
                before: addButton
            }),
            grid = we.dom.create('table', {
                id: 'we-sheet-body-grid-' + we.sheet.count,
                className: 'we-grid-sheet-body-grid',
                onkeydown: function(e){
                    if (e.keyCode === 46){
                        console.log('Hello!');
                        we.sheet.selectionClean();
                    } else if(e.keyCode === 38){
                        e.preventDefault();
                        we.sheet.upArrowDown();
                    } else if(e.keyCode === 40){
                        e.preventDefault();
                        we.sheet.downArrowDown();
                    } else if(e.keyCode === 39){
                        e.preventDefault();
                        we.sheet.leftArrowDown();
                    } else if(e.keyCode === 37){
                        e.preventDefault();
                        we.sheet.rightArrowDown();
                    }
                },
                rowArr: [],
                colArr: [],
                sheet: we.sheet.count,
                renderTo: sheetBody
            });

        for(var i = 0; i < we.rows.count; i++){
            we.rows.insertTo(grid, {
                row: i,
                id: 'we-row-' + we.sheet.count + '-' + i
            });
        }

        we.sheet.colsFind(grid);

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
    };

    we.sheet.add = function(){
        var newSheet = {};
        we.sheet.items.push(newSheet);
        we.sheet.create(newSheet);
    };

})()