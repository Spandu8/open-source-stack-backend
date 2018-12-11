const express = require('express');
const consign = require('consign');

const app = express();

    consign()
    .include("./libs/middleware.js")
    // .then("routes")
    //
    // //.then("./libs/boot.js")
    .into(app);

    // Including route files
    const register = require('./routes/registrationRoute');
    app.use('/api', register);


    var mongoose = require("mongoose");
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/open_stack_db');
    var db = mongoose.connection;

    app.listen(3400);
