const githubTopicsService = require('../services/githubTopicsService');

exports.getGithubTopics = (req, res) => {
  githubTopicsService.getAllTopics().then(topics => {
    res.send(topics);
  }).catch((err) => {
      res.send(err);
      console.log(err)
  })
}
