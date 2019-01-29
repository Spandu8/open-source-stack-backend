const express = require("express");

const router = express.Router();

const gitHubUser = require('../controllers/github-user');
const gitHubController = require('../controllers/github');

router.get('/github/user', gitHubUser.getUser);
router.post('/github/user', gitHubUser.setUser);
router.get('/github/languages', gitHubController.getAllLanguages);
router.get('/github/trending', gitHubController.getTrending);
router.get('/github/repositories', gitHubController.getRepositories);
router.get('/github/getUsersByLanguage', gitHubController.getUsersByLanguage);

module.exports = router;
