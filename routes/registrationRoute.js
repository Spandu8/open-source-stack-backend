const express = require("express");

const router = express.Router();

const register_controller = require('../controllers/registrationController');

router.post('/user/register',register_controller.registerUser);
router.post('/user/login', register_controller.login);
module.exports = router;
