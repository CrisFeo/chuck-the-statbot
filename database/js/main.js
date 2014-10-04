#! node
var R = require('ramda');
var mongoose = require('mongoose');
var message = require('./models/message');

/* ==== Database Connection ==== */
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function () {
  console.log("Connected to db");
});
