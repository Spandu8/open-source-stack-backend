const express = require("express");

const router = express.Router();

const favourite_controller = require('../controllers/userFavouriteTopics');

router.post('/addToFavourite/topic', favourite_controller.addToFavourite);

router.get('/favouriteTopics', favourite_controller.getFavouriteTopics);

module.exports = router;
