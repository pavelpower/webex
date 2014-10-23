(function(){
    we.sheet = {};
    we.sheet.count = 0;
    we.sheet.items = [];
    we.sheet.active = 1;

    we.sheet.items.clear = function(){
        var len = we.sheet.items.length;

        for(var i = 0; i < len; i++){
            we.sheet.items[i].label.className = 'we-grid-sheet-label';
            we.sheet.items[i].body.className = 'we-grid-sheet-body';
        }
    };

    we.sheet.create = function(newSheet){
        var sheetBody = we.document.createElement('div'),
            sheetLabel = we.document.createElement('div');

        we.sheet.count++;

        sheetBody.className = 'we-grid-sheet-body';
        sheetLabel.className = 'we-grid-sheet-label';
        sheetLabel.textContent  = 'Sheet' + we.sheet.count;

        sheetBody.id = 'we-sheet-body-' + we.sheet.count;
        sheetLabel.id = 'we-sheet-label-' + we.sheet.count;
        sheetBody.innerHTML = we.sheet.count;

        if(we.sheet.count === 1) {
            sheetLabel.className += ' we-grid-sheet-label-active';
            sheetBody.className += ' we-grid-sheet-body-active';
        }

        newSheet.id = we.sheet.count;
        newSheet.label = sheetLabel;
        newSheet.body = sheetBody;

        sheetLabel.onclick = function(){
            var currentId = this.id.split('-').reverse()[0];

            we.sheet.items.clear();

            this.className += ' we-grid-sheet-label-active';
            we.general.getElement('we-sheet-body-' + currentId).className += ' we-grid-sheet-body-active';
        };

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