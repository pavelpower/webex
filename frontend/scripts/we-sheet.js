(function(){
    we.sheet = {};
    we.sheet.count = 0;
    we.sheet.items = [];
    we.sheet.active = 1;
    we.sheet.colsCount = 26;
    we.sheet.rowsCount = 100;

    we.sheet.items.clear = function(){
        var len = we.sheet.items.length;

        for(var i = 0; i < len; i++){
            we.sheet.items[i].label.className = 'we-grid-sheet-label';
            we.sheet.items[i].body.className = 'we-grid-sheet-body';
        }
    };

    we.sheet.create = function(newSheet){
        var sheetBody = we.document.createElement('div'),
            sheetLabel = we.document.createElement('div'),
            grid = we.document.createElement('table');

        for(var i = 0; i < we.sheet.rowsCount; i++){
            var row = grid.insertRow(0);
            row.id = 'we-row-' + we.sheet.count + '-' + (we.sheet.rowsCount - i);
            row.className = 'we-row';

            for(var j = 0; j < we.sheet.colsCount; j++){
                var cell = row.insertCell(0);
                cell.id = 'we-cell-' + we.sheet.count + '-' + (we.sheet.rowsCount - i) + '-' + (we.sheet.colsCount - j);
                if(j === (we.sheet.colsCount - 1)){
                    cell.className = 'we-cell-head';
                    cell.innerHTML = (we.sheet.rowsCount - i);
                    console.log(j);
                } else{
                    cell.className = 'we-cell';
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
            sheetLabel.className += ' we-grid-sheet-label-active';
            sheetBody.className += ' we-grid-sheet-body-active';
        }

        newSheet.id = we.sheet.count;
        newSheet.label = sheetLabel;
        newSheet.body = sheetBody;
        newSheet.grid = grid;

        sheetLabel.onclick = function(){
            var currentId = this.id.split('-').reverse()[0];

            we.sheet.items.clear();

            this.className += ' we-grid-sheet-label-active';
            we.general.getElement('we-sheet-body-' + currentId).className += ' we-grid-sheet-body-active';
        };

        sheetBody.appendChild(grid);
        we.doc.docLayout.appendChild(sheetBody);
        //we.general.getElement('we-sheet-add-button').insertBefore(sheetLabel);
        we.doc.docFooter.insertBefore(sheetLabel, we.general.getElement('we-sheet-add-button'));
    };

    we.sheet.add = function(){
        var newSheet = {};
        we.sheet.items.push(newSheet);
        we.sheet.create(newSheet);
    };

})()