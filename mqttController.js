const mqtt = require('mqtt')

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
  // Handle MQTT payload
  // findID (nodeMac or gatwayMac) --> UUID
  // Insert to mongodb >> sensorData collection
  // client.publish('UUID', payload)
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
