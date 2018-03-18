var mongoose = require('mongoose');

var userDetailsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  UserId:{
      type:String,
      unique:true,
      required:true
    },
  UserName:String,
  Status:{
    type:String,
    required:true
  },
  GatewayMAC:[String],
  NodeMAC:[String],
  Created_at:{
	type:Date,
	default:Date.now
   },
},{ collection: 'userDetails' });

module.exports = mongoose.model('userDetails',userDetailsSchema);
