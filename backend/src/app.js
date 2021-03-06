const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const logger = require('morgan');

const indexRoutes = require("./controllers/mainController").routes;
const bookRoutes = require("./controllers/bookController").routes;
const userRoutes = require("./controllers/userController").routes;

const dbConnect = require('./db/dbConnect').dbConnect;

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'..', '..', 'frontend', 'build')));

app.use('/', indexRoutes);
app.use('/book/', bookRoutes);
app.use('/user/', userRoutes);

dbConnect();
module.exports = app;