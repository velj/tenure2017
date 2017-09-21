var express = require('express')

  , http = require('http')
  , path = require('path');

var fs = require('fs');


var app = express.createServer(express.logger());
var buf = new Buffer(256,"utf-8");

app.use(express.static(__dirname + '/public'));
app.use(express.static('/images'));

buf = fs.readFileSync("index.html","utf-8");



app.get('/', function(request, response) {
  response.send(buf.toString('utf8', 0, buf.length));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
