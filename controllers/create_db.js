const http = require("http");
var MongoClient = require("mongodb").MongoClient;
var user_url = "mongodb://localhost:27017/users";
var project_url = "mongodb://localhost:27017/projects";

module.exports = () => {
  return {
    createDb: cb => {
      var createUsers = user();
      var createProjects = project();
      Promise.all([createUsers, createProjects])
        .then(res => {
          cb(res);
        })
        .catch(err => {
          cb({ status: 400, message: "error in creating database" });
        });
    }
  };
};

function user() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      user_url,
      { useNewUrlParser: true },
      function(err, db) {
        if (err) throw err;
        db.close();
        resolve({ status: 200, message: "created user database" });
      }
    );
  });
}

function project() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      project_url,
      { useNewUrlParser: true },
      function(err, db) {
        if (err) throw err;
        db.close();
        resolve({ status: 200, message: "created project database" });
      }
    );
  });
}
