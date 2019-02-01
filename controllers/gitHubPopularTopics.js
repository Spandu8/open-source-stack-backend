const popularTopicsService = require('../services/githubPopularTopicsService');

exports.getPopularTopics = (req,res) => {
  popularTopicsService.getAllPopularTopics().then(topics => {
    res.send(topics);
  }).catch((err) => {
    res.send(err);
  })
}
