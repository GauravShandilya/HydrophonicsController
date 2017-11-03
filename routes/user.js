var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );

exports.registrationSuccessful=function(req,res){
  res.render('new-user');
                  }

exports.logout=function(req,res){
    console.log("Logging  Out :"+req.session.username);
    var loggedOutUser=req.session.username;
    req.session.destroy();
    console.log("Logged Out :"+loggedOutUser);
    res.render('logout',{loggedOutUser:loggedOutUser});
}


exports.doCreate=function(req,res){
   var username=req.body.username;
   var email=req.body.email;
   var password=req.body.password;
   console.log("Creating User with username or email Before creating new user");

   var newuser=new User();
   newuser.username=username;
   newuser.email=email;
   newuser.password=password;
   console.log("Creating User with username or email Before save");

   newuser.save(function(err,savedUser){
       if(err){
         console.log("User already exists with that username or email");
         var message="A user already exists with that username or email";
         res.render("register",{errorMessage:message});
         return;
       }else{
         console.log("Creating User with username or email");

         req.session.newuser=savedUser.username;
         res.render("new-user",{session:req.session});
       }
   });
}


exports.login=function(req,res){
    var email=req.body.email;
    var password=req.body.password;

    User.findOne({email:email}, function(err,user){
      console.log("User "+user);
      if(user==null){
        console.log("User is null redirecting to login");
        var message="Invalid email or password";
        console.log("Message :"+message);
        res.render("login",{errorMessage:message});
        return;
      }


     user.comparePassword(password,function(err,isMatch){
       if(isMatch && isMatch==true){
         console.log("Authentication Sucessfull");
         req.session.username=user.username;
         req.session.loggedIn=true;
         console.log("Got User : "+req.session.username);
         res.render("new-story",{session:req.session});
       }else{
         console.log("Authentication UnSucessfull");
         var message="Invalid email or password";
         console.log("Message :"+message);
         res.render("login",{errorMessage:message});
         return;
       }
     });
    });
  }
