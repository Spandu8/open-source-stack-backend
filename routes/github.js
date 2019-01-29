const express = require("express");

const router = express.Router();

const gitHubUser = require('../controllers/github-user');
const gitHubLang = require('../controllers/github-languages');
const githubTrending = require('../controllers/github-trending');

router.get('/github/user', gitHubUser.getUser);
router.post('/github/user', gitHubUser.setUser);
router.get('/github/languages', gitHubLang.getAllLanguages);
router.get('/github/trending', githubTrending.getTrending);

module.exports = router;
