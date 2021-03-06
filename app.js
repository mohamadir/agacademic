var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var app = express();

var index = require('./routes/index');
var auth = require('./routes/auth');
var users = require('./routes/users');
var admin = require('./routes/admin');
var newartical = require('./routes/newartical');
var artical_text = require('./routes/artical_text');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// DataBase 
var mongoose = require('mongoose');
mongoose.connect('mongodb://academic:academic1234@ds127341.mlab.com:27341/academic');
//mongoose.connect('mongodb://localhost/academic');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// session 
app.use(session({
  secret: "secret",
  saveUninitialized: true,
  resave: true
}));

app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/admin', admin);
app.use('/artical_text', artical_text);
app.use('/newartical', newartical);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
