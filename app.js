var chalk = require('chalk');
var express=require('express');
var mongoose=require('mongoose');
var db=require('./models/db.js');

var routes=require('./routes/route.js');
var configure=require('./routes/configure.js');
var analyze=require('./routes/analyze.js');
var script=require('./routes/script.js');
var bodyParser=require('body-parser');
var user=require('./routes/user.js');


var session=require('express-session');

var app=express();

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(cookieParser());
var session=require('express-session');
app.use(session({secret:"qazwsxedcrfvtgbyhnujm",resave: true, saveUninitialized: true}));

var port = process.env.PORT || 3001;

app.get('/',routes.index);
app.get('/login',routes.login);
app.get('/register',routes.register);
app.post('/newUser',user.doCreate);
app.post('/authenticate',user.login);
app.post('/ScriptInputs',routes.cyclicActuatorInput);


// app.get('/', function (req, res) {
//   res.send('Hydrophonic Controller Started!')
// })
var server=app.listen(port,function(req,res){

    console.log(chalk.green("Catch the action at http://localhost:"+port));
});
