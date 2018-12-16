const express = require('express');
const consign = require('consign');

const app = express();

    consign()
    .include("./libs/middleware.js")
    .into(app);

    // Including route files
    const register = require('./routes/registrationRoute');
    app.use('/api', register);
    
    var mongoose = require("mongoose");
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/OSS');
    var db = mongoose.connection;

    app.listen(3400);
