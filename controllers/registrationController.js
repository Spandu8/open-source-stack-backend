const registration_Service = require("../services/registerService");

exports.registerUser = (req,res) => {
  console.log(req);
    registration_Service.registerUser(req.body).then(result => {
        res.send(result);
    })
    .catch(err => {
      res.send(err);
    })
}

exports.login = (req,res) => {
  registration_Service.validateUserName(req.body.userName, req.body.password).then(user => {
    res.send(user);
  })
  .catch(err => {
    res.send(err);
  })
}

exports.getUser = (req,res) => {
  registration_Service.getUserDetails(req.params.id).then(result => {
    res.send(result);
  })
  .catch(err => {
    res.send(err);
  })
}
