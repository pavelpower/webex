var express = require('express'),
    server = express(),
    location = "../frontend/",
    bodyParser = require('body-parser');

server.use(express.static(location));
server.use(bodyParser.json());

server.post('/checkname', function(req, res) {
    console.log('Get request from checkname!');
    console.log(req.body);
    res.send({
        'isExist': true
    });
});

server.listen(3000, function(){
    console.log('Listen the port 3000...');
});
