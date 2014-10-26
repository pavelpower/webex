(function(){
    we.rows = {};
    we.rows.count = 100;

    we.rows.insertTo = function(grid, config) {
        var row = we.dom.create('tr', {
            id: config.id,
            className: 'we-row',
            renderTo: grid
        });

        for(var i = 0; i < we.cols.count; i++){
            we.cell.insertTo(row, {
                row: config.row,
                col: i,
                id: 'we-cell-' + grid.sheet + '-' + config.row + '-' + i,
                addInput: (i === 0 || config.row === 0) ? false : true,
                inputId: 'we-input-' + grid.sheet + '-' + config.row + '-' + i
            });
        }
    };
})()