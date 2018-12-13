const Registration = require("../models/registrationModel");
var config = require("../config/session");
var jwt = require("jsonwebtoken"),
secret = config.secret;

exports.registerUser =  (req,res) => {
  var registration = new Registration(req.body);
    registration.save()
      .then(data => {
        res.json({
          message: "User Registered Successfully",
          data: data
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        })
      })
}

exports.login = (req,res) => {
  validateUserName(req.body.userName, req.body.password).then(user => {
    res.send({
      message: "Login Success",
      data: user
    })
  })
  .catch(err => {
    res.send(err);
  })
}

function validateUserName(userName, password){
  return new Promise ((resolve, reject) => {
    Registration.findOne({userName: userName})
    .then(user => {
      if(user){
        authenticateUser(user, password)
        .then((user) => {
          return resolve(getAuthenticatedResponse(user));
        })
        .catch(err => {
          return reject(err);
        })
      }
      else{
        return reject({
          message: "Invalid UserName"
        });
      }
    })
    .catch(err => {
      console.log("error")
      return reject(err);
    })
  })
}

function authenticateUser(user, password){
  return new Promise((resolve, reject) => {
    if(password != user.password){
      return reject({
        code: 403,
        message: "Invalid Password"
      })
    }
    return resolve(user);
  });
}

function getAuthenticatedResponse(user){
  if(!user){
    return null;
  }
  var userData = user;
  var data = {};
  data.userName = userData.userName;
  data.firstName = userData.firstName;
  data.lastName = userData.lastName;
  data.id= userData.id;
  data.token = authenticate(userData);
  return data;
}

function authenticate(userData) {
  if (!userData) {
    return null;
  }
  // generate a user id and authenticate
  var payload = {
    userInfo: userData.id
  };
  // return token and user information with a refresh token
  var options = {
      expiresIn: 86400 // expires in 24 hours
    };

  return jwt.sign(payload, secret, options);
}
