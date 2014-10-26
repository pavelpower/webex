(function(){
    we.cell = {};
    we.cell.insertTo = function(row, config) {
        var cell = we.dom.create('td', {
                id: config.id,
                className: 'we-cell',
                renderTo: row
            });

        if(config.row === 0 && config.col === 0){
            cell.className = 'we-cell-main';
        } else if (config.col === 0){
            cell.className = 'we-cell-row-head';
            cell.innerHTML = 'R' + config.row;
        } else if (config.row === 0) {
            cell.className = 'we-cell-col-head';
            cell.innerHTML = 'C' + config.col;
        }

            if (config.addInput){
                var input = we.dom.create('input', {
                    id: config.inputId,
                    type: 'text',
                    className: 'we-cell-input',
                    onclick: function(){
                        we.sheet.selectionClear();
                        we.dom.addClass(this, 'we-cell-input-active');
                        we.sheet.selection.push(this);
                    },
                    ondblclick: function(){
                        this.readOnly = false;
                        we.dom.addClass(this, 'we-cell-input-oninput')
                    },
                    onblur: function(){
                        this.readOnly = true;
                    },
                    readOnly: true,
                    renderTo: cell
                });
            }
    };
})()