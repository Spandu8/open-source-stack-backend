const githubTopicsService = require('../services/userFavouriteTopics');

exports.addToFavourite = (req, res) => {
  githubTopicsService.addToFavourite(req.body).then(topics => {
    res.send(topics);
  }).catch((err) => {
    res.send(err);
    console.log(err);
  })
}

exports.getFavouriteTopics = (req, res) => {
  let userId = req.query.userId;
  githubTopicsService.favouriteTopics(userId).then(topics => {
    res.send(topics);
  }).catch((err) => {
    res.send(err);
  })
}
