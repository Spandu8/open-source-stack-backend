var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var Registration = require('../models/registrationModel');


passport.use('local', new localStrategy(function(userName, password, done){
  Registration.findOne({
    $or: [{ userName: userName }, { email: userName }]
  }).then(user => {
    console.log(user,'users');
    if(user === null)
    {
      return done(null, false, {
        errors: "email or username is invalid"
     })
   }
    return done(null, user);
  }).catch(done);
}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
