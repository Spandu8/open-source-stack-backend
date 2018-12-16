const Registration = require("../models/registrationModel");
var config = require("../config/session");
var jwt = require("jsonwebtoken"),
secret = config.secret;

function verifyUserNameExist(user){
  return new Promise(function(resolve, reject) {
    Registration.find({ $or: [ {userName: user.userName} , {email: user.email} ] })
    .then(users => {
      if(users.length){
        return reject({
          code: 400,
          message: "Email or username already exist"
        })
      } else{
        return resolve(user)
      }
    })
  });
}

function registerUser(user){
  return new Promise((resolve, reject) => {
    verifyUserNameExist(user).then(user => {
      const registration = new Registration(user);
      registration.save()
          .then(data => {
              return resolve({
                message: "user registered successfully"
              })
          })
          .catch(err => {
              return reject({
                  message: "unable to save to database"
              })
          })
    })
    .catch(err => {
      return reject(err)
    })
  })
}

function validateUserName(userName, password){
  return new Promise ((resolve, reject) => {
    Registration.findOne({ $or: [ { userName: userName }, { email: userName } ] } )
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
          message: "Invalid UserName",
          status: 402
        });
      }
    })
    .catch(err => {
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
  data.id = userData.id;
  data.email = userData.email;
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

function getUserDetails(id){
  return new Promise((resolve, reject) => {
    Registration.findOne({_id: id}).then(user => {
        return resolve(userDetails(user));
    })
    .catch(err => {
      return reject(err);
    })
  })
}

function userDetails(user){
    var data = {};
    data.userName = user.userName;
    data.firstName = user.firstName;
    data.lastName = user.lastName;
    data.email = user.email;
    data.id = user.id;
    data.create_date = user.create_date;
    return data;
}

module.exports = {
  registerUser,
  verifyUserNameExist,
  validateUserName,
  getUserDetails
}
