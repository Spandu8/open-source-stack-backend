const githubLang = require("../services/github-languages");

exports.getAllLanguages = (req, res) => {
  githubLang
    .getLanguages()
    .then(languages => {
      res.send(languages);
    })
    .catch(err => {
      res.send(err);
    });
};
