const githubUserService = require('../services/github-user');

exports.getUser = (req,res) => {
  githubUserService.getUser(req.body).then(topics => {
    res.send(topics);
  }).catch((err) => {
    res.send(err);
  })
}

exports.setUser = (req, res) => {
  githubUserService.setUser(req.body.token).then(user => {
    res.send(user);
  }).catch((err) => {
    res.send(err);
  })
}
