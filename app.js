var chalk = require('chalk');
var express=require('express');
var mongoose=require('mongoose');
//var db=require('./models/db.js');

//var routes=require('./routes/route.js');
//var user=require('./routes/user.js');
//var story=require('./routes/story.js');
var bodyParser=require('body-parser');

var session=require('express-session');

var app=express();

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(cookieParser());
var session=require('express-session');
app.use(session({secret:"qazwsxedcrfvtgbyhnujm",resave: true, saveUninitialized: true}));

var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  res.send('Hydrophonic Controller!')
})
var server=app.listen(port,function(req,res){

    console.log(chalk.green("Catch the action at http://localhost:"+port));
});
