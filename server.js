var express = require('express');
var path = require('path');

var app = express();

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    var file = path.join(__dirname, "index.html");

    res.sendFile(file, function(err){
        if (err) {
            res.statusCode = err.status;
            console.log("Couldn't serve file: " + file);
            console.log("Error: " + err.message);
        } else {
            console.log("Serving file: " + file);
        }
    });
});

app.listen(port, function(){
    console.log("App listening on port " + port);
});