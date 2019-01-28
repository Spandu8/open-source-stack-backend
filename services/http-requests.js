const https = require('https');
const request = require('request');

module.exports = () => {
    return {
        getUserData(token) {
            return new Promise((resolve, reject) => {
                const options = {
                    url: `https://api.github.com/user?access_token=${token}`,
                    headers: {
                      'User-Agent': 'request',
                      'content-type': 'application/json',
                      'accept': 'application/json'
                    }
                  };
                  request(options, function (error, response, body) {
                    resolve(JSON.parse(body));
                  });
            });
        }
    }
};