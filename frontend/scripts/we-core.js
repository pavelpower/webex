(function(){
    var timer = setInterval(isReady, 0);

    function isReady() {
        if (document.readyState === 'complete') {
            clearInterval(timer);

            window.we = {};

            we.document = document;
            we.body = document.body;

            //block for message box
            we.messageBoxCounter = 0;
            we.messageBox = function(params) {
                var messageBoxLayout = this.document.createElement('div'),
                    messageBoxBody = this.document.createElement('div'),
                    messageBoxHeader = this.document.createElement('div'),
                    messageBoxClose = this.document.createElement('img'),
                    messageBoxTitle = this.document.createElement('span'),
                    messageBoxText = this.document.createElement('div');

                we.messagesCounter++;

                messageBoxLayout.className = 'we-message__background';
                messageBoxBody.className = 'we-message__body';
                messageBoxHeader.className = 'we-message__header';
                messageBoxTitle.className = 'we-message__title';
                messageBoxText.className = 'we-message__text';
                messageBoxClose.className = 'we-message__close';

                messageBoxClose.onclick = function(){
                    var currentId = this.id.split('-').reverse()[0],
                        msgLayout = we.general.getElement('we-msg-' + currentId);

                    msgLayout.remove();
                };

                messageBoxLayout.id = 'we-msg-' + we.messageBoxCounter;
                messageBoxTitle.innerHTML = params.title || 'Message: ';
                messageBoxText.textContent = params.text || '';
                messageBoxClose.src = 'images/icons/we-close-icon.png';
                messageBoxClose.id = 'we-msg-close-' + we.messageBoxCounter;

                messageBoxHeader.appendChild(messageBoxTitle);
                messageBoxHeader.appendChild(messageBoxClose);
                messageBoxBody.appendChild(messageBoxHeader);
                messageBoxBody.appendChild(messageBoxText);
                messageBoxLayout.appendChild(messageBoxBody);
                this.body.appendChild(messageBoxLayout);
            };

            //block for dialog box
            we.dialog = {};
            we.dialog.timer = 0;
            we.dialog.checkStatus = function(events) {
                if (we.dialog.queue) {
                    clearInterval(we.dialog.timer);

                    if(we.dialog.result){
                        events.accept();
                    } else if (we.dialog.result === false){
                        events.decline();
                    } else {
                        events.cancel();
                    }
                }
            };
            we.dialog.listener = function(events) {
                we.dialog.timer = setInterval(function() {
                    we.dialog.checkStatus(events);
                }, 0);
            };
            we.dialog.finalize = function(obj){
                var currentId = obj.id.split('-').reverse()[0],
                    dlgLayout = we.general.getElement('we-dlg-' + currentId);

                dlgLayout.remove();
            };

            we.dialogBoxCounter = 0;
            we.dialogBox = function(params, events){
                var dialogBoxLayout = this.document.createElement('div'),
                    dialogBoxBody = this.document.createElement('div'),
                    dialogBoxHeader = this.document.createElement('div'),
                    dialogBoxClose = this.document.createElement('img'),
                    dialogBoxTitle = this.document.createElement('span'),
                    dialogBoxText = this.document.createElement('div'),
                    dialogBoxButtonsBox = this.document.createElement('div'),
                    dialogButtonsFragment = this.document.createDocumentFragment(),
                    dialogBoxYesButton = this.document.createElement('input'),
                    dialogBoxNoButton = this.document.createElement('input'),
                    dialogBoxCancelButton = this.document.createElement('input');

                we.dialogBoxCounter++;

                dialogBoxClose.onclick = function(){
                    we.dialog.queue = true;
                    we.dialog.result = undefined;
                    we.dialog.finalize(this);
                };

                dialogBoxYesButton.onclick = function() {
                    we.dialog.queue = true;
                    we.dialog.result = true;
                    we.dialog.finalize(this);
                };

                dialogBoxNoButton.onclick = function() {
                    we.dialog.queue = true;
                    we.dialog.result = false;
                    we.dialog.finalize(this);
                };

                dialogBoxCancelButton.onclick = function() {
                    we.dialog.queue = true;
                    we.dialog.result = undefined;
                    we.dialog.finalize(this);
                };

                dialogBoxLayout.className = 'we-dialog__background';
                dialogBoxBody.className = 'we-dialog__body';
                dialogBoxHeader.className = 'we-dialog__header';
                dialogBoxTitle.className = 'we-dialog__title';
                dialogBoxClose.className = 'we-dialog__close';
                dialogBoxText.className = 'we-dialog__text';
                dialogBoxButtonsBox.className = 'we-dialog__button-box';
                dialogBoxYesButton.className = 'we-dialog__buttons';
                dialogBoxNoButton.className = 'we-dialog__buttons';
                dialogBoxCancelButton.className = 'we-dialog__buttons';

                dialogBoxYesButton.id = 'we-dlg-yes-btn-' + we.dialogBoxCounter;
                dialogBoxNoButton.id = 'we-dlg-no-btn-' + we.dialogBoxCounter;
                dialogBoxCancelButton.id = 'we-dlg-cancel-btn-' + we.dialogBoxCounter;

                dialogBoxLayout.id = 'we-dlg-' + we.dialogBoxCounter;
                dialogBoxTitle.innerHTML = params.title || 'Dialog';
                dialogBoxClose.src = 'images/icons/we-close-icon.png';
                dialogBoxClose.id = 'we-dlg-close-' + we.dialogBoxCounter;
                dialogBoxText.textContent = params.text || '';
                dialogBoxYesButton.value = 'Yes';
                dialogBoxNoButton.value = 'No';
                dialogBoxCancelButton.value = 'Cancel';
                dialogBoxYesButton.type = 'button';
                dialogBoxNoButton.type = 'button';
                dialogBoxCancelButton.type = 'button';

                dialogButtonsFragment.appendChild(dialogBoxCancelButton);
                dialogButtonsFragment.appendChild(dialogBoxNoButton);
                dialogButtonsFragment.appendChild(dialogBoxYesButton);

                dialogBoxButtonsBox.appendChild(dialogButtonsFragment);
                dialogBoxHeader.appendChild(dialogBoxTitle);
                dialogBoxHeader.appendChild(dialogBoxClose);
                dialogBoxBody.appendChild(dialogBoxHeader);
                dialogBoxBody.appendChild(dialogBoxText);
                dialogBoxBody.appendChild(dialogBoxButtonsBox);
                dialogBoxLayout.appendChild(dialogBoxBody);
                this.body.appendChild(dialogBoxLayout);

                we.dialog.queue = false;
                we.dialog.result = false;

                we.dialog.listener(events);
            };

            //TODO: create formBox
            we.formBox = function(params, fields){
                var formboxLayout = we.document.createElement('div'),
                    formboxBoxBody = this.document.createElement('div'),
                    formboxBoxHeader = this.document.createElement('div'),
                    formboxBoxClose = this.document.createElement('img'),
                    formboxBoxTitle = this.document.createElement('span'),
                    formboxBoxForm = this.document.createElement('form'),
                    formboxBoxButtonsBox = this.document.createElement('div'),
                    formboxBoxResetButton = this.document.createElement('input'),
                    formboxBoxCreateButton = this.document.createElement('input'),
                    formboxBoxCancelButton = this.document.createElement('input');

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

                formboxBoxForm.appendChild(addField({
                    label: 'Title1',
                    type: 'text'
                }));

                formboxBoxForm.appendChild(addField({
                    label: 'Title2',
                    type: 'text'
                }));

                formboxBoxButtonsBox.appendChild(formboxBoxCancelButton);
                formboxBoxButtonsBox.appendChild(formboxBoxCreateButton);
                formboxBoxButtonsBox.appendChild(formboxBoxResetButton);
                formboxBoxHeader.appendChild(formboxBoxTitle);
                formboxBoxHeader.appendChild(formboxBoxClose);
                formboxBoxBody.appendChild(formboxBoxHeader);
                formboxBoxBody.appendChild(formboxBoxForm);
                formboxBoxBody.appendChild(formboxBoxButtonsBox);
                formboxLayout.appendChild(formboxBoxBody);
                this.body.appendChild(formboxLayout);

                function addField(config){
                    var box = we.document.createElement('div'),
                        label = we.document.createElement('span'),
                        input = we.document.createElement('input');

                    label.className = 'we-formbox-field-label';
                    input.className = 'we-formbox-field-input';
                    box.className = 'we-formbox-panel';

                    label.textContent = config.label + ':';

                    box.appendChild(label);
                    box.appendChild(input);

                    return box;
                }
            };

            //create general settings
            we.general = {};

            we.general.getElement = function(selector){
                return we.document.getElementById(selector);
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

            we.general.create = function(){
                this.loadModule('../scripts/we-doc.js');

                we.doc.create({
                     sheetsCount: 3
                });
            };

            we.general.create();
        }
    }
})()