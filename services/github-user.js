const USER = require("../models/Users");
const httpRequests = require("./http-requests");
const rest = httpRequests();

function setUser(token) {
  return new Promise((resolve, reject) => {
    return rest.getUserData(token).then(res => {
      USER.findOneAndUpdate(
        { userId: res.id },
        {
          userId: res.id,
          name: res.name,
          imageUrl: res.avatar_url,
          authToken: token
        },
        { upsert: true, new: true, runValidators: true }, // options
        function(err, doc) {
          if (err) {
          } else {
            return resolve(res);
          }
        }
      );
    });
  });
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    USER.update(
      { _id: id },
      {
        $set: {
          isEmailVerfied: true
        }
      }
    ).then(user => {
      return resolve(user);
    });
  });
}

module.exports = {
  getUser: getUser,
  setUser: setUser
};
