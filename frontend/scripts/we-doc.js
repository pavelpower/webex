(function(){
    we.doc = {};
    we.doc.docBody = we.dom.getElement('we-container__body');
    we.doc.isOpened = false;
    we.doc.isSaved = false;

    we.doc.sheetMenu = {};

    we.doc.sheetMenu.textWeight = we.dom.getElement('we-settingsMenu__bold-select');
    we.doc.sheetMenu.textWeight.onchange = function(){
        var selected = we.sheet.selection,
            len = selected.length;

        for(var i = 0; i < len; i++){
            selected[i].customStyle.textWeight = this.value;
            selected[i].style.fontWeight = this.value;
        }
    };

    we.doc.sheetMenu.textColor = we.dom.getElement('we-settingsMenu__color-select');
    we.doc.sheetMenu.textColor.oninput = function(){
        var selected = we.sheet.selection,
            len = selected.length;

        for(var i = 0; i < len; i++){
            selected[i].customStyle.textColor = this.value;
            selected[i].style.color = this.value;
        }
    };

    we.doc.sheetMenu.isUnderline = we.dom.getElement('we-settingsMenu__underline');
    we.doc.sheetMenu.isUnderline.onclick = function(){
        var isUnderline = false,
            textDecor = 'none',
            selected = we.sheet.selection,
            len = selected.length;

        if(we.dom.hasClass(this, 'we-settingsMenu__underline-active')) {
            we.dom.removeClass(this, 'we-settingsMenu__underline-active');
            isUnderline = false;
            textDecor = 'none';
        } else {
            we.dom.addClass(this, 'we-settingsMenu__underline-active');
            isUnderline = true;
            textDecor = 'underline';
        }

        for(var i = 0; i < len; i++){
            selected[i].customStyle.isUnderlined = isUnderline;
            selected[i].style.textDecoration = textDecor;
        }
    };

    we.doc.sheetMenu.isItalic = we.dom.getElement('we-settingsMenu__italic');
    we.doc.sheetMenu.isItalic.onclick = function(){
        var isItalic = false,
            textStyle = 'normal',
            selected = we.sheet.selection,
            len = selected.length;

        if(we.dom.hasClass(this, 'we-settingsMenu__italic-active')) {
            we.dom.removeClass(this, 'we-settingsMenu__italic-active');
            isItalic = false;
            textStyle = 'normal';
        } else {
            we.dom.addClass(this, 'we-settingsMenu__italic-active');
            isItalic = true;
            textStyle = 'italic';
        }

        for(var i = 0; i < len; i++){
            selected[i].customStyle.isItalic = isItalic;
            selected[i].style.fontStyle = textStyle;
        }
    };

    we.doc.sheetMenu.textAlignLeft = we.dom.getElement('we-settingsMenu__textAlignLeft');
    we.doc.sheetMenu.textAlignCenter = we.dom.getElement('we-settingsMenu__textAlignCenter');
    we.doc.sheetMenu.textAlignRight = we.dom.getElement('we-settingsMenu__textAlignRight');

    we.doc.sheetMenu.borderThick = we.dom.getElement('we-settingsMenu__borderThick');
    we.doc.sheetMenu.borderThick.oninput = function(){
        var selected = we.sheet.selection,
            len = selected.length,
            border = 'none';

        for(var i = 0; i < len; i++){
            selected[i].customStyle.borderThick = this.value;
            border = this.value + 'px ' + selected[i].customStyle.borderType + ' ' + selected[i].customStyle.borderColor;
            selected[i].style.border = border;
        }
    };

    we.doc.sheetMenu.borderColor = we.dom.getElement('we-settingsMenu__borderColor');
    we.doc.sheetMenu.borderColor.oninput = function(){
        var selected = we.sheet.selection,
            len = selected.length,
            border = 'none';

        for(var i = 0; i < len; i++){
            selected[i].customStyle.borderColor = this.value;
            border = selected[i].customStyle.borderThick + 'px ' + selected[i].customStyle.borderType + ' ' + this.value
            selected[i].style.border = border;
        }
    };

    we.doc.sheetMenu.borderType = we.dom.getElement('we-settingsMenu__borderType');
    we.doc.sheetMenu.borderType.onchange = function(){
        var selected = we.sheet.selection,
            len = selected.length,
            border = 'none';

        for(var i = 0; i < len; i++){
            selected[i].customStyle.borderType = this.value;
            border = selected[i].customStyle.borderThick + 'px ' + this.value + ' ' + selected[i].customStyle.borderColor;
            selected[i].style.border = border;
        }
    };

    we.doc.sheetMenu.backgroundColor = we.dom.getElement('we-settingsMenu__backgroundColor');
    we.doc.sheetMenu.backgroundColor.oninput = function(){
        var selected = we.sheet.selection,
            len = selected.length;

        for(var i = 0; i < len; i++){
            selected[i].customStyle.backgroundColor = this.value;
            selected[i].style.backgroundColor = this.value;
        }
    };

    we.doc.fields = {};
    we.doc.fields.items = [];
    we.doc.fields.enable = function() {

    };
    we.doc.fields.init = function(){
        var bar = we.dom.getElement('we-bar'),
            len = bar.childNodes.length;

        for(var i = 0; i < len; i++){
            if(bar.childNodes[i].nodeType === 1)
                bar.childNodes[i].disabled = false;
        }
    };

    we.doc.calcRange = function(){};

    we.doc.formulaField = we.dom.getElement('we-formula-fld');

    we.doc.create = function(config) {
        //create loading gif for user
        we.doc.docBody.style.background = 'url("../images/loading.gif") no-repeat center center';
        we.doc.docBody.onclick = function(){
            we.sheet.contextmenuClear();
        };

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