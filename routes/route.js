var mongoose = require( 'mongoose' );

exports.index=function(req,res){
                  res.render('index',{session:req.session});
              }

exports.login=function(req,res){
     // mongo

      res.render('login');
                                                  }
exports.register=function(req,res){
      res.render('register');
}

exports.cyclicActuatorInput=function(req,res){
      console.log(req.query.wpRunningTime);
        console.log(req.query.wpDuration);
          console.log(req.query.apRunningTime);
            console.log(req.query.apDuration);
         var data = req.body;
         console.log("Inside Cyclic Actuator Input "+JSON.stringify(data));
}

exports.ConfigureInput = function(req,res){
      console.log(req.query.deviceId);
      console.log(req.query.deviceName);
      var data = req.body;
      console.log("Inside Configure Input"+JSON.stringify(data));

}
