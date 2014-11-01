var express = require('express'),
    server = express(),
    location = "../frontend/",
    bodyParser = require('body-parser'),
    mongojs = require('mongojs'),
    db = mongojs('webex');

server.use(express.static(location));
server.use(bodyParser.json());

server.post('/checkname', function(req, res) {
    console.log(req.body);

    var collection = db.collection('docs'),
        findObj = {
            name: req.body.value
        };

    collection.find(findObj, function(err, docs) {
        if(docs.length === 0){
            res.send({
                isExist: false
            });
        } else{
            res.send({
                isExist: true,
                message: 'There is already existed file with the same name!'
            });
        }
    });
});

server.listen(3000, function(){
    console.log('Listen the port 3000...');
});
