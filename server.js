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

app.get('/api', function(req, res){
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var language = req.headers["accept-language"];
    var software = req.headers['user-agent'];
    software = software.substring(software.indexOf("(")+1, software.indexOf(")"));

    res.json({
        "ip-address": ip,
        "language": language,
        "software": software
    });
});

app.listen(port, function(){
    console.log("App listening on port " + port);
});