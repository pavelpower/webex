(function(){
    we.doc = {};
    we.doc.docBody = we.general.getElement('we-container__body');
    we.doc.isOpened = false;
    we.doc.isSaved = false;

    we.doc.create = function(config) {
        //create loading gif for user
        we.doc.docBody.style.background = 'url("../images/loading.gif") no-repeat center center';

        we.general.loadModule('../scripts/we-sheet.js');
        we.doc.createLayout();

        for (var i = 0; i < config.sheetsCount; i++) {
            we.sheet.add();
        }

        //revert to default stage
        we.doc.docBody.style.background = '#e7e7e7';

        we.doc.isOpened = true;
        we.doc.isSaved = true;
    };

    we.doc.createLayout = function() {
        var docGrid = we.document.createElement('div'),
            docFooter = we.document.createElement('div'),
            sheetAddButton = we.document.createElement('div');

        sheetAddButton.className = 'we-sheet-add-button';
        sheetAddButton.id = 'we-sheet-add-button';

        sheetAddButton.onclick = function(){
            we.sheet.add();
        };

        docFooter.id = 'we-doc-footer';
        docFooter.className = 'we-doc-footer';

        docGrid.id = 'we-doc-grid';
        docGrid.className = 'we-doc-grid';

        we.doc.docLayout = docGrid;
        we.doc.docFooter = docFooter;

        docFooter.appendChild(sheetAddButton);
        we.doc.docBody.appendChild(docGrid);
        we.doc.docBody.appendChild(docFooter);
    };

    we.doc.open = function() {
        console.log('Open document!');
    };

    we.doc.save = function() {
        console.log('Save document!');
    };

    we.doc.close = function() {
        console.log('Close document!');
        we.doc.docBody.innerHTML = '';

        we.doc.isOpened = false;
        we.sheet.count = 0;
        we.sheet.items = [];
        we.sheet.active = 1;
    };
})()