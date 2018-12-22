const express = require('express');
const consign = require('consign');

const app = express();

    consign()
    .include("./libs/middleware.js")
    .into(app);

    // Including route files
    const register = require('./routes/registrationRoute');
    const emailVerification = require('./routes/verifyEmail');
    app.use('/api', register);
    app.use('/api', emailVerification);
    
    var mongoose = require("mongoose");
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/OSS');
    var db = mongoose.connection;

    app.listen(3401);
