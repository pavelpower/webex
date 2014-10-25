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

            we.core.msg.formFieldFinalize = function() {};
            we.core.msg.formFieldReset = function() {};
            we.core.msg.formFieldBox = function() {};

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

                if(config.renderTo) we.dom.addItem(elem, config.renderTo);

                return elem;
            };

            we.dom.addItem = function(e, renderTo) {
                renderTo.appendChild(e);
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

            we.formbox = {};
            we.formbox.finalize = function(obj){
                var currentId = obj.id.split('-').reverse()[0],
                    dlgLayout = we.general.getElement('we-frm-' + currentId);

                dlgLayout.remove();
            };
            we.formbox.defaultValues = [];
            we.formbox.params = [];

            we.formbox.reset = function() {};

            we.formBoxCounter = 0;
            we.formBox = function(params, fields, callback){
                var formboxLayout = we.dom.document.createElement('div'),
                    formboxBoxBody = we.dom.document.createElement('div'),
                    formboxBoxHeader = we.dom.document.createElement('div'),
                    formboxBoxClose = we.dom.document.createElement('img'),
                    formboxBoxTitle = we.dom.document.createElement('span'),
                    formboxBoxForm = we.dom.document.createElement('form'),
                    formboxBoxButtonsBox = we.dom.document.createElement('div'),
                    formboxBoxResetButton = we.dom.document.createElement('input'),
                    formboxBoxCreateButton = we.dom.document.createElement('input'),
                    formboxBoxCancelButton = we.dom.document.createElement('input'),
                    fieldCount = fields.length;

                we.formBoxCounter++;
                we.formbox.defaultValues = [];

                formboxBoxClose.onclick = function() {
                    we.formbox.finalize(this);
                };

                formboxBoxCancelButton.onclick = function(){
                    we.formbox.finalize(this);
                };
                formboxBoxCreateButton.onclick = function(){
                    readForm();

                    we.formbox.finalize(this);

                    callback(convertToObject(we.formbox.params));
                };

                formboxBoxResetButton.className = 'we-formbox__buttons';
                formboxBoxCreateButton.className = 'we-formbox__buttons';
                formboxBoxCancelButton.className = 'we-formbox__buttons';

                formboxBoxResetButton.value = 'Reset';
                formboxBoxCreateButton.value = 'Create';
                formboxBoxCancelButton.value = 'Cancel';

                formboxBoxResetButton.type = 'button';
                formboxBoxCreateButton.type = 'button';
                formboxBoxCancelButton.type = 'button';

                formboxLayout.className = 'we-formbox__background';
                formboxBoxBody.className = 'we-formbox__body';
                formboxBoxHeader.className = 'we-formbox__header';
                formboxBoxTitle.className = 'we-formbox__title';
                formboxBoxClose.className = 'we-formbox__close';
                formboxBoxForm.className = 'we-formbox__form';
                formboxBoxButtonsBox.className = 'we-formbox__button-box';

                formboxBoxClose.src = 'images/icons/we-close-icon.png';
                formboxBoxTitle.innerHTML = params.title || 'FormBox';
                formboxLayout.id = 'we-frm-' + we.formBoxCounter;
                formboxBoxClose.id = 'we-frm-close-' + we.formBoxCounter;
                formboxBoxCancelButton.id = 'we-frm-btn-close-' + we.formBoxCounter;
                formboxBoxCreateButton.id = 'we-frm-btn-create-' + we.formBoxCounter;

                for(var i = 0; i < fieldCount; i++){
                    var obj = fields[i];

                    we.formbox.defaultValues.push({
                        name: fields[i].name,
                        value: fields[i].defaultValue
                    });

                    obj.id = i + 1;

                    formboxBoxForm.appendChild(addField(obj));
                }

                formboxBoxButtonsBox.appendChild(formboxBoxCancelButton);
                formboxBoxButtonsBox.appendChild(formboxBoxCreateButton);
                formboxBoxButtonsBox.appendChild(formboxBoxResetButton);
                formboxBoxHeader.appendChild(formboxBoxTitle);
                formboxBoxHeader.appendChild(formboxBoxClose);
                formboxBoxBody.appendChild(formboxBoxHeader);
                formboxBoxBody.appendChild(formboxBoxForm);
                formboxBoxBody.appendChild(formboxBoxButtonsBox);
                formboxLayout.appendChild(formboxBoxBody);
                we.dom.body.appendChild(formboxLayout);

                function addField(config){
                    var box = we.dom.document.createElement('div'),
                        label = we.dom.document.createElement('span'),
                        input = we.dom.document.createElement('input');

                    label.className = 'we-formbox-field-label';
                    input.className = 'we-formbox-field-input';
                    box.className = 'we-formbox-panel';

                    label.textContent = config.label + ':';

                    input.id = config.name;
                    input.type = config.type;
                    input.value = config.defaultValue || '';

                    box.appendChild(label);
                    box.appendChild(input);

                    return box;
                };

                function readForm(){
                    var arr = [];

                    for(var i = 0; i < fieldCount; i++){
                        var elem = we.general.getElement(we.formbox.defaultValues[i].name),
                            obj = {};

                        obj.name = elem.id;
                        obj.value = elem.value || 3;

                        arr.push(obj);
                    }

                    we.formbox.params = arr;
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

            //create general settings
            we.general = {};

            we.general.getElement = function(selector){
                return we.dom.document.getElementById(selector);
            };

            we.general.loadModule = function(script){
                var xhr = new XMLHttpRequest();
                xhr.open('GET', script, false);
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4 && xhr.status === 200){
                        eval(xhr.responseText);
                    }
                };
                xhr.send(null);
            };

            we.general.init = function(){
                this.loadModule('../scripts/we-doc.js');
                we.doc.fields.init();
            };

            we.newDoc = we.general.getElement('we-new-doc');
            we.newDoc.onclick = function() {
                if(!we.doc.isOpened){
                    we.formBox(
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
                } else{
                    if(we.doc.isSaved){
                        we.core.msg.dialogBox({
                            title: 'Warning!',
                            text: 'We close current document, and you create the new one. Do you want to close current document?'
                        }, {
                            accept: function() {
                                we.doc.save();
                                we.doc.close();
                                we.formBox(
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
                    } else{
                        we.core.msg.dialogBox({
                            title: 'Warning!',
                            text: 'We close current document, and you create the new one. Do you want to save current document before?'
                        }, {
                            accept: function() {
                                we.doc.close();
                                we.formBox(
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
                        })
                    }
                }
            };

            we.saveDoc = we.general.getElement('we-save-doc');
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

            we.openDoc = we.general.getElement('we-open-doc');
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
                                we.formBox(
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

            we.general.init();
        }
    }
})()