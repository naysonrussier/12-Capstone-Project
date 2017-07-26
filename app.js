var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var Users = require("./Models/user.js");

var index = require('./routes/index');
var api = require('./routes/api');
var projects = require('./routes/projects');
var mid = require('./middleware/index')

var app = express();


mongoose.connect('mongodb://treehouse:treehouse@ds119682.mlab.com:19682/capstone-project');
var db = mongoose.connection;
//mongo error
db.on("error", console.error.bind(console, 'connection error:'));

// use sessions for traching logins
app.use(session({
  secret: 'tneaaymstornereuhsosuiseer',
  resave: true,
  saveUninitialised: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/projects', mid.requiresLogin, express.static(path.join(__dirname, 'public/projects')));
app.use(express.static(path.join(__dirname, 'public')));

// make user ID available in templates
app.use(function(req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

app.use('/', index);
app.use('/api/1.0', api);
app.use('/projects-api', mid.requiresLogin, projects);
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
  res.render('h_error');
});

module.exports = app;
