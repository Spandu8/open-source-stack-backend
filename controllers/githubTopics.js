const githubTopicService = require("../services/githubTopicsService");
exports.getTopics = (req, res) => {
  githubTopicService
    .getAllTopics()
    .then(topics => {
      res.send(topics);
    })
    .catch(err => {
      res.send(err);
    });
};
