var chalk = require('chalk');
var mongoose = require( 'mongoose' );
var bcrypt=require('bcrypt');
var SALT_WORK_FACTOR = 10;

//var dbURI = 'mongodb://<HydrophonicGroup>:<Abcd@@123>@ds117625.mongoLab.com:17625/hydrophonic-controller-db';
//var dbURI = 'mongodb://gauravshandilya:Abcd@@123@ds117625.mlab.com:17625/hydrophonic-controller-db';
var dbURI = 'mongodb://127.0.0.1/hydrophonicControllerdb'
//mongoose.Promise = global.Promise;
//mongoose.connect(dbURI.toString());

mongoose.connect(process.env.MONGOLAB_URI || dbURI);


mongoose.connection.on('connected', function () {
  console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error',function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
  console.log(chalk.red('Mongoose disconnected'));
});



var userSchema = new mongoose.Schema({
  username: {type: String, unique:true},
  email: {type: String, unique:true},
  password: String
});


userSchema.pre('save', function(next) {
    var user = this;
    console.log("Before Registering the user");
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        console.log("Salt");
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            console.log("Hash : "+hash);
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};



// Build the User model
mongoose.model( 'User', userSchema );

// Stories Schema

var storiesSchema = new mongoose.Schema({
  author:String,
  title: {type: String,unique:true},
  created_at:{type:Date,default:Date.now},
  summary:String,
  content: {type: String},
  imageLink:String,
  comments:[{body:String,commented_by:String,date:Date}],
  slug:String
});

// Build the User model

mongoose.model( 'Story', storiesSchema,'stories');

// Build the sensorData model

var sensorData = new mongoose.Schema({
  GatewayMAC:String,
  NodeMAC:String,
  EventType:String,
  SensorName:String,
  Value:String,
  Battery:String,
  Created_at:{type:Date,default:Date.now},
});

mongoose.model( 'Story', storiesSchema,'stories');
