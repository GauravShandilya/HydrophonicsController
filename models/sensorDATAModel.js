var mongoose = require('mongoose');


var sensorDataSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  GatewayMAC:String,
  NodeMAC:String,
  EventType:String,
  SensorName:String,
  Value:String,
  Battery:String,
  Created_at:{
	type:Date,
	default:Date.now
   },
},{ collection: 'sensorDATA' });
module.exports = mongoose.model('sensorINFO',sensorDataSchema);
