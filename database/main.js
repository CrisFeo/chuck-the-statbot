#! node

var Models = require('./models');

/*==== Database Connection ==== */
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected!");
  Models.initialize();
});
