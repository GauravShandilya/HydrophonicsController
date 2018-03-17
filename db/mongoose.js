var chalk = require('chalk');
var mongoose = require('mongoose');


var dbURI = 'mongodb://sensorUser:sensorUser123@127.0.0.1/hydrophonicControllerdb'
mongoose.connect(process.env.MONGOLAB_URI || dbURI);

var db = mongoose.connection;

db.on('connected', function () {
  console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

db.on('error',function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

db.on('disconnected', function () {
  console.log(chalk.red('Mongoose disconnected'));
});

module.exports = mongoose;
