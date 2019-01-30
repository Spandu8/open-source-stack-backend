const githubTopicsService = require('../services/githubTopicsService');

exports.getGithubTopics = (req, res) => {
  githubTopicsService.getAllTopics().then(topics => {
    res.send(topics);
  }).catch((err) => {
      res.send(err);
      console.log(err)
  })
}

exports.searchTopic = (req, res) => {
  console.log(req.query)
  githubTopicsService.searchTopic(req.query.q).then(searchResults => {
    res.send(searchResults);
  }).catch((err) => {
    res.send(err);
  })
}
