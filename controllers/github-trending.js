const githubTrending = require("../services/github-trending");

exports.getTrending = (req, res) => {
    githubTrending.
    getTrending(req.body.language, req.body.sort, req.body.order, req.body.token, req.body.page)
    .then(languages => {
      res.send(languages);
    })
    .catch(err => {
      res.send(err);
    });
};
