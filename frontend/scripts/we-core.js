(function(){
    var timer = setInterval(isReady, 0);

    function isReady() {
        if (document.readyState === 'complete') {
            clearInterval(timer);

            window.we = {};

            //********************************************************
            //**********block for creating application core***********
            //********************************************************

            we.core = {};
            we.core.extend = function (objFrom, objTo) {
                for(var n in objFrom){
                    if(objFrom.hasOwnProperty(n)) objTo[n] = objFrom[n];
                }
            };
            we.core.loadModule = function(script) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', script, false);
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4 && xhr.status === 200){
                        eval(xhr.responseText);
                    }
                };
                xhr.send(null);
            };
            we.core.init = function() {
                we.core.loadModule('../scripts/we-doc.js');
            };
            we.core.findClassInArray = function(key, value, array) {
                var len = array.length;

                for (var i = 0; i < len; i++){
                    if(array[i][key] === value) return array[i];
                }

                return null;
            };
            we.core.max = function(a, b) {
                return a > b ? a : b;
            };
            we.core.min = function(a, b) {
                return a < b ? a : b;
            };

            we.core.msg = {};
            we.core.msg.messageCount = 0;
            we.core.msg.messageBox = function(params){
                we.core.msg.messageCount++;
                var messageBoxLayout = we.dom.create('div', {
                        id: 'we-msg-' + we.core.msg.messageCount,
                        className: 'we-message__background',
                        renderTo: we.dom.body
                    }),
                    messageBoxBody = we.dom.create('div', {
                        className: 'we-message__body',
                        renderTo: messageBoxLayout
                    }),
                    messageBoxHeader = we.dom.create('div', {
                        className: 'we-message__header',
                        renderTo: messageBoxBody
                    }),
                    messageBoxText = we.dom.create('div', {
                        className: 'we-message__text',
                        textContent: params.text || '',
                        renderTo: messageBoxBody
                    }),
                    messageBoxTitle = we.dom.create('span', {
                        className: 'we-message__title',
                        innerHTML: params.title || 'Message: ',
                        renderTo: messageBoxHeader
                    }),
                    messageBoxClose = we.dom.create('img', {
                        id: 'we-msg-close-' + we.core.msg.messageCount,
                        className: 'we-message__close',
                        src: 'images/icons/we-close-icon.png',
                        renderTo: messageBoxHeader,
                        onclick: function() {
                            var currentId = this.id.split('-').reverse()[0],
                                msgLayout = we.dom.getElement('we-msg-' + currentId);

                            msgLayout.remove();
                        }
                    });
            };
            we.core.msg.dialogCount = 0;
            we.core.msg.dialogQueue = false;
            we.core.msg.dialogTimer = 0;
            we.core.msg.dialogResult = false;
            we.core.msg.dialogListener = function(events) {
                we.core.msg.dialogTimer = setInterval(function() {
                    we.core.msg.dialogCheckStatus(events);
                }, 0);
            };
            we.core.msg.dialogFinalize = function(obj) {
                var currentId = obj.id.split('-').reverse()[0],
                    dlgLayout = we.dom.getElement('we-dlg-' + currentId);

                dlgLayout.remove();
            };
            we.core.msg.dialogCheckStatus = function(events) {
                if (we.core.msg.dialogQueue) {
                    clearInterval(we.core.msg.dialogTimer);

                    if(we.core.msg.dialogResult){
                        events.accept();
                    } else if (we.core.msg.dialogResult === false){
                        events.decline();
                    } else {
                        events.cancel();
                    }
                }
            };
            we.core.msg.dialogBox = function(params, events) {
                we.core.msg.dialogCount++;
                var dialogBoxLayout = we.dom.create('div', {
                        id: 'we-dlg-' + we.core.msg.dialogCount,
                        className: 'we-dialog__background',
                        renderTo: we.dom.body
                    }),
                    dialogBoxBody = we.dom.create('div', {
                        className: 'we-dialog__body',
                        renderTo: dialogBoxLayout
                    }),
                    dialogBoxHeader = we.dom.create('div', {
                        className: 'we-dialog__header',
                        renderTo: dialogBoxBody
                    }),
                    dialogBoxText = we.dom.create('div', {
                        className: 'we-dialog__text',
                        textContent: params.text || '',
                        renderTo: dialogBoxBody
                    }),
                    dialogBoxButtonsBox = we.dom.create('div', {
                        className: 'we-dialog__button-box',
                        renderTo: dialogBoxBody
                    }),
                    dialogBoxTitle = we.dom.create('span', {
                        className: 'we-dialog__title',
                        innerHTML: params.title || 'Dialog',
                        renderTo: dialogBoxHeader
                    }),
                    dialogBoxClose = we.dom.create('img', {
                        id: 'we-dlg-close-' + we.core.msg.dialogCount,
                        src: 'images/icons/we-close-icon.png',
                        className: 'we-dialog__close',
                        onclick: function(){
                            we.core.msg.dialogQueue = true;
                            we.core.msg.dialogResult = undefined;
                            we.core.msg.dialogFinalize(this);
                        },
                        renderTo: dialogBoxHeader
                    }),
                    dialogBoxCancelButton = we.dom.create('input', {
                        id: 'we-dlg-cancel-btn-' + we.core.msg.dialogCount,
                        type: 'button',
                        className: 'we-dialog__buttons',
                        value: 'Cancel',
                        onclick: function() {
                            we.core.msg.dialogQueue = true;
                            we.core.msg.dialogResult = undefined;
                            we.core.msg.dialogFinalize(this);
                        },
                        renderTo: dialogBoxButtonsBox
                    }),
                    dialogBoxNoButton = we.dom.create('input', {
                        id: 'we-dlg-no-btn-' + we.core.msg.dialogCount,
                        type: 'button',
                        className: 'we-dialog__buttons',
                        value: 'No',
                        onclick: function() {
                            we.core.msg.dialogQueue = true;
                            we.core.msg.dialogResult = false;
                            we.core.msg.dialogFinalize(this);
                        },
                        renderTo: dialogBoxButtonsBox
                    }),
                    dialogBoxYesButton = we.dom.create('input', {
                        id: 'we-dlg-yes-btn-' + we.core.msg.dialogCount,
                        type: 'button',
                        className: 'we-dialog__buttons',
                        value: 'Yes',
                        onclick: function() {
                            we.core.msg.dialogQueue = true;
                            we.core.msg.dialogResult = true;
                            we.core.msg.dialogFinalize(this);
                        },
                        renderTo: dialogBoxButtonsBox
                    });

                we.core.msg.dialogQueue = false;
                we.core.msg.dialogResult = false;

                we.core.msg.dialogListener(events);
            };
            we.core.msg.formFieldCount = 0;
            we.core.msg.formFieldDefaults = [];
            we.core.msg.formFieldParams = {};
            we.core.msg.formFieldFinalize = function(obj) {
                var currentId = obj.id.split('-').reverse()[0],
                    dlgLayout = we.dom.getElement('we-frm-' + currentId);

                dlgLayout.remove();
            };
            we.core.msg.formFieldReset = function() {};
            we.core.msg.formFieldBox = function(params, fields, callback) {
                we.core.msg.formFieldCount++;
                we.core.msg.formFieldDefaults = [];
                var formboxLayout = we.dom.create('div', {
                        id: 'we-frm-' + we.core.msg.formFieldCount,
                        className: 'we-formbox__background',
                        renderTo: we.dom.body
                    }),
                    formboxBoxBody = we.dom.create('div', {
                        className: 'we-formbox__body',
                        renderTo: formboxLayout
                    }),
                    formboxBoxHeader = we.dom.create('div', {
                        className: 'we-formbox__header',
                        renderTo: formboxBoxBody
                    }),
                    formboxBoxForm = we.dom.create('form', {
                        className: 'we-formbox__form',
                        renderTo: formboxBoxBody
                    }),
                    formboxBoxButtonsBox = we.dom.create('div', {
                        className: 'we-formbox__button-box',
                        renderTo: formboxBoxBody
                    }),
                    formboxBoxTitle = we.dom.create('span', {
                        className: 'we-formbox__title',
                        innerHTML: params.title || 'FormBox',
                        renderTo: formboxBoxHeader
                    }),
                    formboxBoxClose = we.dom.create('img', {
                        id: 'we-frm-close-' + we.core.msg.formFieldCount,
                        className: 'we-formbox__close',
                        src: 'images/icons/we-close-icon.png',
                        onclick: function(){
                            we.core.msg.formFieldFinalize(this);
                        },
                        renderTo: formboxBoxHeader
                    }),
                    formboxBoxCancelButton = we.dom.create('input', {
                        id: 'we-frm-btn-close-' + we.core.msg.formFieldCount,
                        className: 'we-formbox__buttons',
                        type: 'button',
                        value: 'Cancel',
                        onclick: function(){
                            we.core.msg.formFieldFinalize(this);
                        },
                        renderTo: formboxBoxButtonsBox
                    }),
                    formboxBoxCreateButton = we.dom.create('input', {
                        id: 'we-frm-btn-create-' + we.core.msg.formFieldCount,
                        className: 'we-formbox__buttons',
                        type: 'button',
                        value: 'Create',
                        onclick: function(){
                            readForm();
                            we.core.msg.formFieldFinalize(this);
                            callback(convertToObject(we.core.msg.formFieldParams));
                        },
                        renderTo: formboxBoxButtonsBox
                    }),
                    formboxBoxResetButton = we.dom.create('input', {
                        id: 'we-frm-btn-reset-' + we.core.msg.formFieldCount,
                        className: 'we-formbox__buttons',
                        type: 'button',
                        value: 'Reset',
                        onclick: function(){},
                        renderTo: formboxBoxButtonsBox
                    }),
                    fieldCount = fields.length;

                for(var i = 0; i < fieldCount; i++){
                    var obj = fields[i];
                    we.core.msg.formFieldDefaults.push({
                        name: fields[i].name,
                        value: fields[i].defaultValue
                    });
                    obj.id = i + 1;
                    we.dom.addItem(addField(obj) , formboxBoxForm);
                }

                function addField(config){
                    var box = we.dom.create('div', {
                            className: 'we-formbox-panel'
                        }),
                        label = we.dom.create('span', {
                            className: 'we-formbox-field-label',
                            textContent: config.label + ':',
                            renderTo: box
                        }),
                        input = we.dom.create('input', {
                            id: config.name,
                            className: 'we-formbox-field-input',
                            type: config.type,
                            value: config.defaultValue || '',
                            renderTo: box
                        });

                    return box;
                };

                function readForm(){
                    var arr = [];

                    for(var i = 0; i < fieldCount; i++){
                        var elem = we.dom.getElement(we.core.msg.formFieldDefaults[i].name),
                            obj = {};

                        obj.name = elem.id;
                        obj.value = elem.value || 3;

                        arr.push(obj);
                    }

                    we.core.msg.formFieldParams = arr;
                }

                function convertToObject(arr){
                    var obj = {},
                        len = arr.length;

                    for(var i = 0; i < len; i++){
                        obj[arr[i].name] = arr[i].value;
                    }

                    return obj;
                }
            };

            //TODO: create standard context menu
            we.core.msg.contextmenu = function(params) {

            };

            //TODO: create standard pallete of drafts (color-picker etc.)
            we.core.pallete = {};

            we.core.pallete.colorPicker = {};
            we.core.pallete.colorPicker.rows = 5;
            we.core.pallete.colorPicker.colors = [
                '#000000',
                '#FFFFFF',
                '#FF0000',
                '#00FF00',
                '#0000FF',
                '#777777',
                '#FFFF00',
                '#FF00FF',
                '#00FFFF'
            ];
            we.core.pallete.colorPicker.create = function(renderTo, config){
                var colorPicker = we.dom.create('div', {
                        className: 'we-color-picker',
                        renderTo: renderTo
                    }),
                    label = we.dom.create('span', {
                        className: 'we-color-picker-label',
                        innerHTML: config.label,
                        renderTo: colorPicker
                    }),
                    colorTable = we.dom.create('ul', {
                        className: 'we-color-picker-tab',
                        renderTo: colorPicker
                    }),
                    defaultButton = we.dom.create('input', {
                        type: 'button',
                        value: 'Default',
                        className: 'we-color-picker-default-btn',
                        onclick: function(){
                            renderTo.linkToParent.removeAttribute('style');
                            we.sheet.contextmenuClear();
                        },
                        renderTo: colorPicker
                    }),
                    colorCount = we.core.pallete.colorPicker.colors.length;

                for(var i = 0; i < colorCount; i++){
                    var color = we.dom.create('li', {
                        className: 'we-color-picker-cell',
                        color: we.core.pallete.colorPicker.colors[i],
                        onclick: function(){
                            renderTo.linkToParent.style.background = this.color;
                            we.sheet.contextmenuClear();
                        },
                        renderTo: colorTable
                    });

                    color.style.background = we.core.pallete.colorPicker.colors[i];
                }
            };

            we.core.pallete.changeName = {};
            we.core.pallete.changeName.create = function(renderTo, config) {
                var changeName = we.dom.create('div', {
                        className: 'we-change-name',
                        renderTo: renderTo
                    }),
                    label = we.dom.create('span', {
                        className: 'we-change-name-label',
                        innerHTML: config.label,
                        renderTo: changeName
                    }),
                    newName = we.dom.create('input', {
                        type: 'text',
                        className: 'we-change-name-field',
                        renderTo: changeName
                    }),
                    changeButton = we.dom.create('input', {
                        type: 'button',
                        className: 'we-change-name-btn',
                        value: 'Change',
                        renderTo: changeName
                    });
            };

            //********************************************************


            //********************************************************
            //****************block for work with DOM*****************
            //********************************************************

            we.dom = {};
            we.dom.document = document;
            we.dom.body = document.body;
            we.dom.getElement = function(id) {
                return we.dom.document.getElementById(id) || null;
            };
            we.dom.create = function(tag, config){
                var elem = we.dom.document.createElement(tag);

                we.core.extend(config, elem);

                if(config.renderTo && config.before) {
                    we.dom.addItemBefore(elem, config.renderTo, config.before);
                } else if(config.renderTo) {
                    we.dom.addItem(elem, config.renderTo);
                }

                return elem;
            };
            we.dom.addItem = function(e, renderTo) {
                renderTo.appendChild(e);
            };
            we.dom.addItemBefore = function(e, renderTo, before) {
                renderTo.insertBefore(e, before);
            };
            we.dom.setClass = function(e, className) {
                e.className = className;
            };
            we.dom.addClass = function(e, className) {
                var classList = e.className,
                    classArr = classList.split(' '),
                    newClass = '';

                classArr.push(className);

                newClass = classArr.join(' ');

                e.className = newClass;
            };
            we.dom.removeClass = function(e, className) {
                var classList = e.className,
                    classArr = classList.split(' '),
                    newArr = [],
                    len = classArr.length;

                for(var i = 0; i < len; i++){
                    if(classArr[i] !== className) {
                        newArr.push(classArr[i]);
                    }
                }

                e.className = newArr.join(' ');
            };

            //********************************************************
            //create general settings

            we.newDoc = we.dom.getElement('we-new-doc');
            we.newDoc.onclick = function() {
                if(!we.doc.isOpened){
                    we.core.msg.formFieldBox(
                        {
                            title: 'New Document'
                        },[
                            {
                                label: 'Name',
                                type: 'text',
                                defaultValue: 'NewDocument',
                                name: 'docName'
                            },
                            {
                                label: 'Sheet Count',
                                type: 'number',
                                defaultValue: 3,
                                name: 'sheetsCount'
                            }
                        ], we.doc.create);
                    we.doc.fields.init();
                } else{
                    if(we.doc.isSaved){
                        we.core.msg.dialogBox({
                            title: 'Warning!',
                            text: 'We close current document, and you create the new one. Do you want to close current document?'
                        }, {
                            accept: function() {
                                we.doc.save();
                                we.doc.close();
                                we.core.msg.formFieldBox(
                                    {
                                        title: 'New Document'
                                    },[
                                        {
                                            label: 'Name',
                                            type: 'text',
                                            defaultValue: 'NewDocument',
                                            name: 'docName'
                                        },
                                        {
                                            label: 'Sheet Count',
                                            type: 'number',
                                            defaultValue: 3,
                                            name: 'sheetsCount'
                                        }
                                    ], we.doc.create);
                                we.doc.fields.init();
                            },
                            decline: function() {
                                console.log('User declined!');
                            },
                            cancel: function() {
                                console.log('User canceled!');
                            }
                        });
                    } else{
                        we.core.msg.dialogBox({
                            title: 'Warning!',
                            text: 'We close current document, and you create the new one. Do you want to save current document before?'
                        }, {
                            accept: function() {
                                we.doc.save();
                                we.doc.close();
                                we.core.msg.formFieldBox(
                                    {
                                        title: 'New Document'
                                    },[
                                        {
                                            label: 'Name',
                                            type: 'text',
                                            defaultValue: 'NewDocument',
                                            name: 'docName'
                                        },
                                        {
                                            label: 'Sheet Count',
                                            type: 'number',
                                            defaultValue: 3,
                                            name: 'sheetsCount'
                                        }
                                    ], we.doc.create);
                                we.doc.fields.init();
                            },
                            decline: function() {
                                console.log('User declined!');
                            },
                            cancel: function() {
                                console.log('User canceled!');
                            }
                        })
                    }
                }
            };

            we.saveDoc = we.dom.getElement('we-save-doc');
            we.saveDoc.onclick = function() {
                if(!we.doc.isOpened){
                    we.core.msg.messageBox({
                        title: 'Warning!',
                        text: 'There is no document to save!'
                    });
                } else if (we.doc.isSaved) {
                    we.core.msg.messageBox({
                        title: 'Message',
                        text: 'Document has already saved!'
                    });
                } else {
                    we.doc.save();
                    we.core.msg.messageBox({
                        title: 'Message',
                        text: 'Document successfully saved.'
                    });
                }
            };

            we.openDoc = we.dom.getElement('we-open-doc');
            we.openDoc.onclick = function() {
                if(we.doc.isOpened){
                    if(we.doc.isSaved){
                        we.core.msg.dialogBox({
                            title: 'Warning!',
                            text: 'We close current document, and you can open your document. Do you want to close current document?'
                        }, {
                            accept: function() {
                                we.doc.close();
                                console.log('Open file dialog window...');
                            },
                            decline: function() {
                                console.log('User declined!');
                            },
                            cancel: function() {
                                console.log('User canceled!');
                            }
                        });
                    } else {
                        we.core.msg.dialogBox({
                            title: 'Warning!',
                            text: 'We close current document, and you can open your document. Do you want to save current document?'
                        }, {
                            accept: function() {
                                we.doc.save();
                                we.doc.close();
                                we.core.msg.formBox(
                                    {
                                        title: 'New Document'
                                    },[
                                        {
                                            label: 'Name',
                                            type: 'text',
                                            defaultValue: 'NewDocument',
                                            name: 'docName'
                                        },
                                        {
                                            label: 'Sheet Count',
                                            type: 'number',
                                            defaultValue: 3,
                                            name: 'sheetsCount'
                                        }
                                    ], we.doc.create);
                            },
                            decline: function() {
                                console.log('User declined!');
                            },
                            cancel: function() {
                                console.log('User canceled!');
                            }
                        });
                    }
                } else {
                    console.log('Open file dialog window...');
                }
            };

            we.core.init();
        }
    }
})()