const express = require("express");

const router = express.Router();

const gitHubUser = require('../controllers/github-user');

router.get('/github-user', gitHubUser.getUser);
router.post('/github-user', gitHubUser.setUser);

module.exports = router;
