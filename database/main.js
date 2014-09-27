#! node

var R = require('ramda');

/* ==== Helpers ==== */
var log = function (message) {
  return console.log.bind(console, message);
};

/* ==== Database Connection ==== */
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', R.pipe(
  log("Connected!")
  // TODO - Whats next?
));
