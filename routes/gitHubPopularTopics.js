const express = require("express");

const router = express.Router();
const gitHubPopularTopicsController = require('../controllers/gitHubPopularTopics');

router.get('/gitHubPopularTopics', gitHubPopularTopicsController.getPopularTopics);

module.exports = router;
