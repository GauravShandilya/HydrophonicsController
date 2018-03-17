module.paths.push('/usr/local/lib/node_modules');
const mqtt = require('mqtt')
url = require('url');

var db = require('./db/mongoose');
var sensorINFO = require('./models/sensorDATAModel');//Load model in to memory

var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://ec2-34-212-20-3.us-west-2.compute.amazonaws.com:1883');
var auth = (mqtt_url.auth || ':').split(':');
var url = "mqtt://"+mqtt_url.host;

// Not sure why this code is needed here.
var options = {
      port: mqtt_url.port,
      clientId: 'mqttjs_'+Math.random().toString(16).substr(2,8),
      username: auth[0],
      password: auth[1],
};

var client = mqtt.connect(url,options); // need to check options.

db.model('sensorINFO'); // use model

/**
 * Node server will always subscribe these topics
 * https://onedrive.live.com/view.aspx?ref=button&Bsrc=SMIT&resid=5F2F8DFA170EF658!138&cid=5f2f8dfa170ef658&app=Excel&authkey=!AluYDL8WRA_KbOY
 *
 * SensorDATA => All gateway will publish regular values with this topic.
 * AlertDATA  => All gateway will publish alert cases with this topic.
 * ScriptPARAMS => Application(android/iOS) will publish values changes against each node.
 */
client.on('connect', () => {
  client.subscribe('SensorDATA')
  client.subscribe('AlertDATA')
  client.subscribe('ScriptPARAMS')
})

client.on('message', (topic, message) => {
  switch (topic) {
    case 'SensorDATA':
      return handleSensorDATA(message)
    case 'AlertDATA':
      return handleAlertDATA(message)
    case 'ScriptPARAMS':
      return handleScriptPARAMS(message)
  }
  console.log('No handler for topic %s', topic)
})

function handleSensorDATA (message) {
var sensorDATAstr = JSON.parse(message);
var sensorDATARecord = new sensorINFO({
    _id: new db.Types.ObjectId(),
    GatewayMAC : sensorDATAstr.GatewayMAC,
    NodeMAC : sensorDATAstr.NodeMAC,
    EventType : sensorDATAstr.EventType,
    SensorName : sensorDATAstr.Sensor,
    Value : sensorDATAstr.Value,
    Battery:sensorDATAstr.Battery
});
sensorDATARecord.save(function(err) {
    if (err) throw err;})

console.log(sensorDATAstr.GatewayMAC);
console.log(sensorDATAstr.NodeMAC);
console.log(sensorDATAstr.Battery);
//sensorDATAstr.CreatedAt = new Date();

//collection.insert(sensorDATAstr, function(err,docs) {
//      if(err) { console.log("Insert fail",err); } // Improve error handling
//    })

  // Handle MQTT payload
  // findID (nodeMac or gatwayMac) --> UUID
  // Insert to mongodb >> sensorData collection
  // client.publish('UUID', payload)
   console.log(sensorDATAstr);
   client.publish(sensorDATAstr.GatewayMAC,message);
}

function handleAlertDATA (message) {
  // Handle MQTT payload
  // findID (nodeMac or gatwayMac) --> UUID
  // Insert to mongodb >> sensorData collection
  // client.publish('UUID', payload)
}

function handleScriptPARAMS (message) {
  // Handle MQTT payload
  // objCurrentSetting = find(message.nodeMac)
  // compare objCurrentSetting & objMQTTPayload
  // if only display name changes no need to publish to gateway
  // if setting changes like default value , timer etc
  // update objCurrentSetting = objMQTTPayload
  // client.publish("objCurrentSetting.gatwayMac",objCurrentSetting)
  // Insert(objCurrentSetting) to mongoDB ->> defaultSystemSetting
}
