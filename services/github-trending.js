const httpRequests = require("./http-requests");
const rest = httpRequests();

function getTrending(language, sort, order, token, page) {
    return new Promise((resolve, reject) => {
        rest.getRepos(language, sort, order, token, page).then(repos => {
            return resolve(repos);
        });
    });  
}

module.exports = {
    getTrending: getTrending
};