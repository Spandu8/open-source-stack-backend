const express = require("express");

const router = express.Router();

const topics = require('../controllers/githubTopics');

router.get('/topics',topics.getTopics);

module.exports = router;
