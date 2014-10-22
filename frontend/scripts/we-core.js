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
            we.messageBox = function(text, title) {
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
                messageBoxTitle.innerHTML = title || 'Message: ';
                messageBoxText.textContent = text || '';
                messageBoxClose.src = 'images/icons/we-close-icon.png';
                messageBoxClose.id = 'we-msg-close-' + we.messageBoxCounter;

                messageBoxHeader.appendChild(messageBoxTitle);
                messageBoxHeader.appendChild(messageBoxClose);
                messageBoxBody.appendChild(messageBoxHeader);
                messageBoxBody.appendChild(messageBoxText);
                messageBoxLayout.appendChild(messageBoxBody);
                this.body.appendChild(messageBoxLayout);
            };

            //TODO: block for dialog box

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