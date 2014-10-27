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
        we.sheet.contextmenu.linkToParent.onContextMenu = false;
        we.sheet.contextmenu.remove();
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

                        we.core.pallete.colorPicker.create(contextmenu);

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