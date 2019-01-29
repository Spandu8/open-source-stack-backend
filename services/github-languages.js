const github = require('@huchenme/github-trending');

function getLanguages() {
    return new Promise((resolve, reject) => {
        github.fetchAllLanguages().then(languages => {
            return resolve(languages);
        });
    });  
}

module.exports = {
    getLanguages: getLanguages
};