(function(){
    we.doc = {};
    we.doc.docBody = we.general.getElement('we-container__body');

    we.doc.create = function(config) {
        //create loading gif for user
        we.doc.docBody.style.background = 'url("../images/loading.gif") no-repeat center center';

        we.general.loadModule('../scripts/we-sheet.js');
        we.doc.createLayout();

        for(var i = 0; i < config.sheetsCount; i++){
            we.sheet.add();
        }

        //revert to default stage
        we.doc.docBody.style.background = '#e7e7e7';
    };

    we.doc.createLayout = function() {
        var docGrid = we.document.createElement('div'),
            docFooter = we.document.createElement('div');

        docFooter.id = 'we-doc-footer';
        docFooter.className = 'we-doc-footer';

        docGrid.id = 'we-doc-grid';
        docGrid.className = 'we-doc-grid';

        we.doc.docLayout = docGrid;
        we.doc.docFooter = docFooter;

        we.doc.docBody.appendChild(docGrid);
        we.doc.docBody.appendChild(docFooter);
    };

    we.doc.open = function() {};

    we.doc.save = function(){};
})()