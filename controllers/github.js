const githubService = require("../services/github");

exports.getAllLanguages = (req, res) => {
  githubService
    .getLanguages()
    .then(languages => {
      res.send(languages);
    })
    .catch(err => {
      res.send(err);
    });
};

exports.getTrending = (req, res) => {
    githubService.
    getTrending(req.body.language, req.body.sort, req.body.order, req.body.token, req.body.page)
    .then(languages => {
      res.send(languages);
    })
    .catch(err => {
      res.send(err);
    });
};

exports.getRepositories = (req, res) => {
  githubService.getRepositories(req.query).then(repositoryList => {
      res.send(repositoryList);
  }).catch((err) => {
      res.send(err);
    console.log(err,'err');
  })
}

exports.getUsersByLanguage = (req, res) => {
  console.log(req.query,'query')
  githubService.getUsersByLanguage(req.query.language).then(users => {
    res.send(users);
  }).catch((err) => {
    res.send(err);
  })
}
