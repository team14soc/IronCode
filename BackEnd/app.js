var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./TwoTiers/PresentationTier/Middleware/index.js');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, './../FrontEnd')));

app.use(express.static('./../FrontEnd'));


app.use('/', indexRouter);

// catch 404 and forward to error handler
//app.use(require('./TwoTiers/PresentationTier/Middleware/notfoundhandler.js').handler);

// error handler
//app.use(require('./TwoTiers/PresentationTier/Middleware/errorhandler.js').handler);


module.exports = app;
