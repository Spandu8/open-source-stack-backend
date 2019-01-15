const githubTopicsService = require('../services/githubTopicsService');

exports.addToFavourite = (req, res) => {
  githubTopicsService.addToFavourite(req.body).then(topics => {
    res.send(topics);
  }).catch((err) => {
    res.send(err);
    console.log(err);
  })
}
