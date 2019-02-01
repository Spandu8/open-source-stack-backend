const github = require('@huchenme/github-trending');
const httpRequests = require("./http-requests");
const rest = httpRequests();


function getLanguages() {
    return new Promise((resolve, reject) => {
        github.fetchAllLanguages().then(languages => {
            return resolve(languages);
        }).catch((err) => {
          return reject(err);
        })
    });
}

function getRepositories(query) {
  return new Promise((resolve, reject) => {
    github.fetchRepositories({ language: query.language, since: query.since })
    .then((repositories) => {
      return resolve(repositories);
      console.log(repositories);
    }).catch((err) => {
      return reject(err);
    })
  })
}

function getTrending(language, sort, order, token, page) {
    return new Promise((resolve, reject) => {
        rest.getRepos(language, sort, order, token, page).then(repos => {
            return resolve(repos);
        }).catch((err) => {
            return reject(err);
        })
    });
}

function getUsersByLanguage(language){
  return new Promise((resolve, reject) => {
      github.fetchDevelopers({ language: language })
      .then(developers => {
          return resolve(developers);
      }).catch((err) => {
        return reject(er);
      })
  })
}

module.exports = {
    getLanguages,
    getRepositories,
    getTrending,
    getUsersByLanguage
};
