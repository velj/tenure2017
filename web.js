var express = require('express')

  , http = require('http')
  , path = require('path');

var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
var db = require('./db');
var fs = require('fs');

// Configure the Basic strategy for use by Passport.
//
// The Basic strategy requires a `verify` function which receives the
// credentials (`username` and `password`) contained in the request.  The
// function must verify that the password is correct and then invoke `cb` with
// a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));


var app = express.createServer(express.logger());
//var buf = new Buffer(256,"utf-8");

app.use(express.static(__dirname + '/public'));
app.use(express.static('images'));
app.use(express.static('js'));
app.use(express.static('img'));
app.use(express.static('public'));

buf = fs.readFileSync("index.html","utf-8");

app.get('/',
 passport.authenticate('basic', { session: false }),
 function(request, response) {
  response.send(buf.toString('utf8', 0, buf.length));
  //response.send(buf.toString('utf8', 0, buf.length));
});

//index2 = fs.readFileSync("index2.html","utf-8");
//app.get('/', function(request, response) {
//  response.send(index2.toString('utf8', 0, index2.length));
//});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
