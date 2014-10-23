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
            we.dialogBoxCounter = 0;
            we.dialogBox = function(params){
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
                    var currentId = this.id.split('-').reverse()[0],
                        dlgLayout = we.general.getElement('we-dlg-' + currentId);

                    dlgLayout.remove();
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
            }

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

                });
            };

            we.general.create();
        }
    }
})()