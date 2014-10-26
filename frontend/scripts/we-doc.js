(function(){
    we.doc = {};
    we.doc.docBody = we.dom.getElement('we-container__body');
    we.doc.isOpened = false;
    we.doc.isSaved = false;

    we.doc.fields = {};
    we.doc.fields.items = [];
    we.doc.fields.enable = function() {

    };
    we.doc.fields.init = function(){
        var bar = we.dom.getElement('we-bar'),
            len = bar.childNodes.length;

        for(var i = 0; i < len; i++){
            console.log(bar.childNodes[i]);
        }
    };

    we.doc.create = function(config) {
        //create loading gif for user
        we.doc.docBody.style.background = 'url("../images/loading.gif") no-repeat center center';

        we.core.loadModule('../scripts/we-sheet.js');
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
        var docGrid = we.dom.create('div', {
                id: 'we-doc-footer',
                className: 'we-doc-grid',
                renderTo: we.doc.docBody
            }),
            docFooter = we.dom.create('div', {
                id: 'we-doc-footer',
                className: 'we-doc-footer',
                renderTo: we.doc.docBody
            }),
            sheetAddButton = we.dom.create('div', {
                id: 'we-sheet-add-button',
                className: 'we-sheet-add-button',
                onclick: function() {
                    we.sheet.add();
                },
                renderTo: docFooter
            });

        we.doc.docLayout = docGrid;
        we.doc.docFooter = docFooter;
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