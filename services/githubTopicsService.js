const GITHUB_TOPICS = require("../models/githubTopics");
const request = require("request");

async function saveTopic(data) {
  isTopicSaved(data.title).then(isSaved => {
    if (!isSaved) {
      const topic = new GITHUB_TOPICS(data);
      topic.save().then(res => {

      });
    }
  });
}

function isTopicSaved(title) {
  return new Promise(function(resolve, reject) {
    GITHUB_TOPICS.find({ title: title }).then(user => {
      if (user.length) {
        resolve(true);
      }
       resolve(false);
    }).catch(err => {
        console.log(err);
        reject(err);
    });
  });
}

function getAllTopics() {
  return new Promise(function(resolve, reject){
    GITHUB_TOPICS.find().then(topics => {
        return resolve(topics);
    }).catch((err) => {
      return reject({
        code: 500,
        message: "INTERNAL SERVER ERROR"
      })
    })
  })
}

function searchTopic(searchQuery) {
  return new Promise(function(resolve, reject){
    request.get({
      "headers": {
        "User-Agent": "request",
        "Accept": "application/vnd.github.mercy-preview+json"
        },
      "url": 'https://api.github.com/search/topics?q=' + searchQuery
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          console.log(response,'response')
            return resolve(JSON.parse(body));
        }else{
          return reject(error);
        }
    })
  })
}

module.exports = {
  saveTopic,
  getAllTopics,
  searchTopic
};
