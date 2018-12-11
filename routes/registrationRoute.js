const express = require("express");

const router = express.Router();

const register_controller = require('../controllers/registrationController');

router.post('/registerUser',register_controller.registerUser);
router.post('/login', register_controller.login);
module.exports = router;
