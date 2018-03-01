module.paths.push('/usr/local/lib/node_modules');
var mqtt = require('mqtt');
url = require('url');
   
//From Here. Test code
var mongodb=require('mongodb'); //Amit
var mongodbClient=mongodb.MongoClient;  
var mongodbURI='mongodb://sensorUser:sensorUser123@127.0.0.1/hydrophonicControllerdb'
var collection; 

   var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://ec2-34-212-20-3.us-west-2.compute.amazonaws.com:1883');
   var auth = (mqtt_url.auth || ':').split(':');
   var url = "mqtt://"+mqtt_url.host;
    
   var options = {
         port: mqtt_url.port,
         clientId: 'mqttjs_'+Math.random().toString(16).substr(2,8),
         username: auth[0],
         password: auth[1],
 };

var client = mqtt.connect(url,options);

//Connection to the mongodb   
mongodbClient.connect(mongodbURI,setupCollection);

//Created table in database
function setupCollection(err,db) {  
  if(err) throw err;
  collection=db.collection("sensorData");
}

 // var client = mqtt.connect('mqtt://test.mosquitto.org');
  client.on('connect', function(){ // when connected
    // subscribe to a topic
      client.subscribe('SensorInfo',function() {
      client.on('message',function(topic,message,packet){
      var str = message.toString('utf8');
      console.log("Recieved SensorInfo before insert ------"+str);
	
//The code will insert json message(received from mqtt broker) in to mongodb
      var jsonStr = JSON.parse(message) //Converted in to JSON object
    //  var jsonFinalObj = new JSON
      jsonStr.CreatedAt = new Date();
      console.log(JSON.stringify(jsonStr)) 
      collection.insert(jsonStr, function(err,docs) {
      if(err) { console.log("Insert fail",err); } // Improve error handling
    } 
   ) 
 
   console.log("Recieved SensorInfo------"+str);
   if(!str.includes("node.js")&& topic=='SensorInfo')
   {
        console.log("Recieved InitConfig-------------"+str);
        var str = message.toString('utf8');
        var obj = JSON.parse(str);
   }   
    });  
   });
   });

   exports.publishScriptMessage = function(req,res)
   {
      var data = req.body;
      console.log('Inside script message'+ JSON.stringify(data));
      client.publish('cyclicScript',JSON.stringify(data),function(err,result){
         if(err)
        {
            console.log("Error in publishing message: "+ err);
        }
   //      console.log("Result is "+result.value); 
     });
   }
