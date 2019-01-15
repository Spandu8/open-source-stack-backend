const githubTopicsService = require('../services/githubTopicsService');

exports.getGithubTopics = (req, res) => {
  console.log("coming here")
  githubTopicsService.getAllTopics().then(topics => {
    res.send(topics);
  }).catch((err) => {
      res.send(err);
      console.log(err)
  })
}
