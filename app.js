var config = require('./config/');

var express = require('express');
var async = require('async');
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var flash = require('connect-flash');
// var passport = require('./auth/local-strategy.js');
var uuid = require('node-uuid');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util = require('util');

var Bathroom = require('./models/bathrooms.js');

// var routes = require('./routes/index');
// var users = require('./routes/users');
var bathrooms = require('./routes/bathrooms.js');

mongoose.connect(config.mongo.dbUrl);
mongoose.connection.on('error', function(error) {
  console.log(error);
});

var mongoStore = new MongoDBStore({
  uri: config.mongo.dbUrl,
  collection: 'webSessions'
});

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cors({origin: 'http://localhost:5000', methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE']}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// app.use('/', routes);
// app.use('/users', users);
app.use('/bathrooms', bathrooms);
app.use(express.static('public'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err.message);
  console.error(err.stack);
  res.sendStatus(500);
});

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(config.serverPort, function() {
  var host = server.address().address;
  var port = server.address().port;

  // %s is a place holder that we replace with 'host' and 'port'
  // it says where %s is, put the first argument, then replace the second %s with the second argument (host, port — are the two arguments)
  console.log("Example app listening at http://%s:%s", host, port);
});

module.exports = app;
