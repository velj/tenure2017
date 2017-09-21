var express = require('express')

  , http = require('http')
  , path = require('path');

var fs = require('fs');


var app = express.createServer(express.logger());
var buf = new Buffer(256,"utf-8");

app.use(express.static(__dirname + '/public'));
app.use(express.static('/images'));
app.use(express.static('/js'));


buf = fs.readFileSync("index.html","utf-8");

app.get('/', function(request, response) {
  response.send(buf.toString('utf8', 0, buf.length));
});

index2 = fs.readFileSync("index2.html","utf-8");
app.get('/index2', function(request, response) {
  response.send(index2.toString('utf8', 0, index2.length));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
