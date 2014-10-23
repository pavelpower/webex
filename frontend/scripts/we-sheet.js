(function(){
    we.sheet = {};
    we.sheet.count = 0;
    we.sheet.items = [];
    we.sheet.active = 1;

    we.sheet.items.clear = function(){
        var len = we.sheet.items.length;

        for(var i = 0; i < len; i++){
            we.sheet.items[i].label.className = 'we-grid-sheet-label';
        }
    };

    we.sheet.create = function(newSheet){
        var sheetBody = we.document.createElement('div'),
            sheetLabel = we.document.createElement('div');

        we.sheet.count++;

        sheetBody.className = 'we-grid-sheet-body';
        sheetLabel.className = 'we-grid-sheet-label';
        sheetLabel.textContent  = 'Sheet' + we.sheet.count;

        sheetLabel.id = 'we-sheet-' + we.sheet.count;

        if(we.sheet.count === 1) sheetLabel.className += ' we-grid-sheet-label-active';

        newSheet.id = we.sheet.count;
        newSheet.label = sheetLabel;
        newSheet.body = sheetBody;

        sheetLabel.onclick = function(){
            we.sheet.items.clear();

            this.className += ' we-grid-sheet-label-active';
        };

        we.doc.docLayout.appendChild(sheetBody);
        we.doc.docFooter.appendChild(sheetLabel);
    };

    we.sheet.add = function(){
        var newSheet = {};
        we.sheet.items.push(newSheet);
        we.sheet.create(newSheet);
    };

})()