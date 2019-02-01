const https = require('https');
const request = require('request');

module.exports = () => {
    return {
        getUserData(token) {
            return new Promise((resolve, reject) => {
                const options = {
                    url: `https://api.github.com/user?access_token=${token}`,
                    headers: {
                      'User-Agent': 'OPEN SOURCE STACK',
                      'content-type': 'application/json',
                      'accept': 'application/json'
                    }
                  };
                  request(options, function (error, response, body) {
                    resolve(JSON.parse(body));
                  });
            });
        },
        getRepos(language, sort, order, token, page) {
            return new Promise((resolve, reject) => {
                const options = {
                    url: `https://api.github.com/search/repositories?q=language:${language}&sort=${sort}&order=${order}&page=${page}`,
                    headers: {
                      'User-Agent': 'OPEN SOURCE STACK',
                      'content-type': 'application/json',
                      'accept': 'application/json',
                      'Authorization':  'token '+token
                    }
                  };
                  request(options, function (error, response, body) {
                      var res = {
                          body: JSON.parse(body)
                      }
                    resolve(res);
                  });
            })
        }
    }
};