var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser')
// var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var scheduleRouter = require('./routes/schedule');
var standingRouter = require('./routes/standing');
var teamRouter = require('./routes/team');
var login = require('./routes/login');
var admin = require('./routes/admin')

var loginUser = require('./models/login_model');
var CronJob_auto = require('./test/corn-job')
var autoSend = require('./test/store_autosend')
var match_comp = require('./models/math_comp');


var app = express();
// var sess

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// javascript setup
app.set('javascripts', path.join(__dirname, 'public/javascripts'));

//set model
app.set('models', path.join(__dirname, 'models'))

app.use(logger('dev'));

app.use(session({
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: true
}));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/schedule', scheduleRouter);
app.use('/standing', standingRouter);
app.use('/team', teamRouter);
app.use('/login', login);
app.use('/admin',admin)

////////////////////////////////// Corn JOB ///////////////////////////////////
CronJob_auto.job(5)
//////////////////////////////////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
