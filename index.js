const express = require("express");
const consign = require("consign");
const https = require("https");
const fs = require("fs");
var mongoose = require("mongoose");
var privateKey = fs.readFileSync("./ssl/oss-key.pem");
var certificate = fs.readFileSync("./ssl/oss-cert.pem");
const cron = require('./libs/cronJob');
const bodyParser = require("body-parser");

var publicDir = require('path').join(__dirname,'/public');
const app = express();

consign()
  .include("./libs/middleware.js")
  .into(app);

// Including route files
const passport = require("passport");
const passportConfig = require("./config/passport");
const register = require("./routes/registrationRoute");
const emailVerification = require("./routes/verifyEmail");
const gitHubTopics = require('./routes/gitHubTopics');
const gitHubPopularTopics = require('./routes/gitHubPopularTopics');
const favouriteTopics = require('./routes/userFavouriteTopics');
const githubUser = require('./routes/github-user');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", register);
app.use("/api", emailVerification);
app.use("/api", gitHubTopics);
app.use("/api", gitHubPopularTopics);
app.use("/api", favouriteTopics);
app.use("/api", githubUser);

app.use(express.static(publicDir));

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
