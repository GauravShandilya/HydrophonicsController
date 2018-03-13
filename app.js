var chalk = require('chalk');
var express=require('express');
var mongoose=require('mongoose');
//var db=require('./models/db.js');
var routes=require('./routes/route.js');
var configure=require('./routes/configure.js');
var analyze=require('./routes/analyze.js');
var script=require('./routes/script.js');
var bodyParser=require('body-parser');
//var user=require('./routes/user.js');
var mqttClient = require('./nodemqtt.js');
var mqttClient = require('./mqttController.js');
var session=require('express-session');
var app=express();

//var io = require('./routes/socket.js');
//var io = require('socket.io');


const WebSocket = require('ws');

var server = require('http').createServer(app);

const wss = new WebSocket.Server({ server });


function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', function connection(ws, req) {
  const ip = req.connection.remoteAddress;
  console.log("IP address of the client = ",ip);
  ws.on('message', function incoming(message) {
	ws.isAlive = true;
        ws.on('ping', heartbeat);
    console.log('received: %s', message);
  });

  ws.send('Test Message');

});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping('', false, true);
  });
}, 30000);

/*var socketio = require('socket.io').listen(server);

socketio.on('connection', function (ClientSocket) {

console.log("Amit Here")
    ClientSocket.on('message', function (msg) {

        console.log('Message Received: ', msg);

       // socket.broadcast.emit('message', msg);

    });

});

*/


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
//app.post('/newUser',user.doCreate);
//app.post('/authenticate',user.login);
app.post('/ScriptInputs',routes.cyclicActuatorInput);
app.post('/ConfigureInputs',routes.ConfigureInput);
app.post('/ScriptInputs',mqttClient.publishScriptMessage);
   app.get('/', function (req, res) {
   res.send('Hydrophonic Controller Started!')
 })

/*var server=app.listen(port,function(req,res){
    console.log(chalk.green("Catch the action at http://localhost:"+port));*/

server.listen(port,function(req,res){
console.log(chalk.green("Catch the action at http://localhost:"+port));
});
//io.initialize(server);
