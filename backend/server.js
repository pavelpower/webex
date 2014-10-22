var express = require('express'),
    server = express(),
    location = "../frontend/";

server.use(express.static(location));

server.listen(3000, function(){
    console.log('Listen the port 3000...');
});
