const express = require("express");

const router = express.Router();

const verify = require('../controllers/verifyEmail');

router.get('/verify/:id',verify.verifyEmail);

module.exports = router;
