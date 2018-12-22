const registrationService = require("../services/registerService");
const bcrypt = require("bcrypt");
const CONSTS = require("../constants");

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

exports.login = (req, res) => {
  var host = req.get('host');
  registrationService
    .validateUserName(req.body.userName, req.body.password, host)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.send(err);
    });
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
