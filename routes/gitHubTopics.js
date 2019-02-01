const express = require("express");

const router = express.Router();

const gitHubTopicsController = require('../controllers/gitHubTopics');

router.get('/gitHubTopics', gitHubTopicsController.getGithubTopics);
router.get('/gitHubTopics/searchTopic', gitHubTopicsController.searchTopic);


module.exports = router;
