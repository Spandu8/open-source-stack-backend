const Registration = require("../models/registrationModel");
var config = require("../config/session");
var jwt = require("jsonwebtoken");
var secret = config.secret;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const emailRoute = require("../routes/verifyEmail");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "opensourcestack.OSS@gmail.com",
    pass: "op3n$ourc3$t@ck"
  }
});

function verifyUserNameExist(user) {
  return new Promise(function(resolve, reject) {
    Registration.find({
      $or: [{ userName: user.userName }, { email: user.email }]
    }).then(users => {
      if (users.length) {
        return reject({
          code: 400,
          message: "Email or username already exist"
        });
      } else {
        return resolve(user);
      }
    });
  });
}

function registerUser(user, host) {
  return new Promise((resolve, reject) => {
    verifyUserNameExist(user)
      .then(user => {
        const registration = new Registration(user);
        registration
          .save()
          .then(data => {
            var mailerOptions = generateMailerOptions(
              user.email,
              data._id,
              host
            );
            transporter.sendMail(mailerOptions, function(error, info) {
              if (error) {
              } else {
                return resolve({
                  message:
                    "user registered successfully and a mail has been sent to your email. Please verify this account",
                  data: data
                });
              }
            });
          })
          .catch(err => {
            return reject({
              message: "unable to save to database"
            });
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
}

function validateUserName(userName, password, host) {
  return new Promise((resolve, reject) => {
    Registration.findOne({ $or: [{ userName: userName }, { email: userName }] })
      .then(user => {
        if (user) {
          authenticateUser(user, password)
            .then(user => {
              return resolve(getAuthenticatedResponse(user, host));
            })
            .catch(err => {
              return reject(err);
            });
        } else {
          return reject({
            message: "Invalid UserName",
            status: 402
          });
        }
      })
      .catch(err => {
        return reject(err);
      });
  });
}

function authenticateUser(user, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, function(err, res) {
      if (res) {
        return resolve(user);
      } else {
        return reject({
          code: 403,
          message: "Invalid Password"
        });
      }
    });
  });
}

function getAuthenticatedResponse(user, host) {
  console.log(host);
  if (!user) {
    return null;
  }
  if (!user.isEmailVerfied) {
    var mailerOptions = generateMailerOptions(user.email, user._id, host);
    return sendVerificationMail(mailerOptions).then(res => {
      console.log("res", res)
      return res;
    });
  } else {
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

function getUserDetails(id) {
  return new Promise((resolve, reject) => {
    Registration.findOne({ _id: id })
      .then(user => {
        return resolve(userDetails(user));
      })
      .catch(err => {
        return reject(err);
      });
  });
}

function userDetails(user) {
  var data = {};
  data.userName = user.userName;
  data.firstName = user.firstName;
  data.lastName = user.lastName;
  data.email = user.email;
  data.id = user.id;
  data.create_date = user.create_date;
  return data;
}

function generateMailerOptions(email, id, host) {
  var mailerOptions = {};
  link = "http://" + host + "/api/verify/" + id;
  mailerOptions = {
    from: "opensourcestack.OSS@gmail.com",
    to: email,
    subject: "Open Source Stack Email verification",
    html:
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      link +
      ">Click here to verify</a>"
  };
  return mailerOptions;
}

function sendVerificationMail(mailerOptions) {
  return new Promise((resolve, reject) => {
  transporter.sendMail(mailerOptions, function(error, info) {
    var data = {};
    if (error) {
      data = {
        success: false,
        message: "Error while sending a verification email please verify later"
      };
    } else {
      data = {
        success: true,
        message: "An email has been sent to your account. Please verify the email to login"
      };
    }
    return resolve(data);
  });
});
}

module.exports = {
  registerUser,
  verifyUserNameExist,
  validateUserName,
  getUserDetails
};
