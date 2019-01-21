const registrationService = require("../services/registerService");
const bcrypt = require("bcrypt");
const CONSTS = require("../constants");
const passport = require("passport");

exports.registerUser = (req, res) => {
  var user = req.body;
  bcrypt.hash(user.password, CONSTS.SALT_ROUNDS, function(err, hash) {
    user.password = hash;
    var host = req.get('host');
    registrationService
      .registerUser(req.body, host)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.send(err);
      });
  });
};

exports.login = (req, res,next) => {
  var host = req.get('host');
  passport.authenticate('local',function(err, user, info){
    if(user){
      registrationService
        .authenticateUser(user, req.body.password, host)
        .then(user => {
          res.send(user);
        })
        .catch(err => {
          res.send(err);
        });
    }else{
      res.send(info);
    }
  })(req, res,next);
};

exports.getUser = (req, res) => {
  registrationService
    .getUserDetails(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
};
