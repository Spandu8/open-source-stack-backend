const express = require('express');
const consign = require('consign');

const app = express();

    consign()
    .include("./libs/middleware.js")
    .then("routes")

    //.then("./libs/boot.js")
    .into(app);
   app.listen(3400);

//exports.api = functions.https.onRequest(app);

//{cwd: process.cwd()}