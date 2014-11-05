var express = require('express'),
    server = express(),
    location = "../frontend/",
    bodyParser = require('body-parser'),
    mongojs = require('mongojs'),
    db = mongojs('webex'),
    fs = require('fs'),
    sha = require('sha256'),
    testMail = 'mike@mail.ru';

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

server.post('/registration', function(req, res){
    console.log(req.body);

    var collection = db.collection('users'),
        findObj = {
            email: req.body.email
        },
        result = {},
        findDocs = null,
        appHash = crypto.createHash('sha256'),
        email = req.body.email;

    collection.find(findObj, function(err, docs){
        if(err) throw err;

        if(docs.length === 0){

        } else {
            result = {
                result: false,
                message: 'The user with the specified address already exists.'
            };

            result = JSON.stringify(result);
            res.send(result);
        }
    });
});

server.post('/login', function(req, res){
    var filename = '../frontend/templates/mainPage.html';

    console.log(req.body);

    var collection = db.collection('users'),
        findObj = {
            email: req.body.email,
            pass: req.body.pass
        },
        result = {},
        findDocs = null,
        fileData = null;

    collection.find(findObj, function(err, docs){
        if(err) throw err;

        if(docs.length === 0){
            result = {
                result: false,
                content: '',
                message: 'This user did not register!'
            };

            result = JSON.stringify(result);
            res.send(result);
        } else {
            fs.readFile(filename, 'utf8', function(err, data){
                if(err) throw err;
                fileData = data;

                result = {
                    result: true,
                    content: fileData
                };

                result = JSON.stringify(result);
                res.send(result);
            });
        }
    });
});

server.listen(3000, function(){
    console.log('Listen the port 3000...');
});
