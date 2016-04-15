var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var fs = require('fs');
var errorHandling = require('./libs/errorHandling');
var routes = require('./routes/index');

var app = express();
var atomFeed = "http://what-if.xkcd.com/feed.atom";
var env = process.env.NODE_ENV || 'dev';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dialog-polyfill', express.static(path.join(__dirname, '/node_modules/dialog-polyfill')));

app.use('/', routes);
app.use(errorHandling.handle404());
app.use(errorHandling.errorHandler(env));

module.exports = app;
