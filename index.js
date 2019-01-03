const express = require("express");
const consign = require("consign");
const https = require("https");
const fs = require("fs");
var mongoose = require("mongoose");
var privateKey = fs.readFileSync("./ssl/oss-key.pem");
var certificate = fs.readFileSync("./ssl/oss-cert.pem");
const cron = require('./libs/cronJob');

const app = express();

consign()
  .include("./libs/middleware.js")
  .into(app);

// Including route files
const register = require("./routes/registrationRoute");
const emailVerification = require("./routes/verifyEmail");
app.use("/api", register);
app.use("/api", emailVerification);

mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb://localhost:27017/OSS",
    { useNewUrlParser: true }
  );
var db = mongoose.connection;
cron.startTrendingGithubScrapping();
cron.startGithubPopularTopicsScrapping();
https
  .createServer(
    {
      key: privateKey,
      cert: certificate
    },
    app
  )
  .listen(3401);
