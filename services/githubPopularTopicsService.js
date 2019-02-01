const GITHUB_POPULAR_TOPICS = require("../models/githubPopularTopics");

async function savePopularTopic(data) {
  isTopPopularicSaved(data.title).then(isSaved => {
    if (!isSaved) {
      const topic = new GITHUB_POPULAR_TOPICS(data);
      topic.save().then(res => {
          console.log(res,"Popular Topic saved")
      }).catch(err => {
        console.log(err);
      })
    }
  });
}

function isTopPopularicSaved(title) {
  return new Promise(function(resolve, reject) {
    GITHUB_POPULAR_TOPICS.find({ title: title }).then(user => {
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

function getAllPopularTopics(){
  return new Promise(function(resolve, reject){
    GITHUB_POPULAR_TOPICS.find().then(topics => {
      return resolve(topics);
    }).catch((err) => {
      return reject({
        code: 500,
        message: "INTERNAL SERVER ERROR"
      })
    })
  })
}

module.exports = {
  savePopularTopic,
  getAllPopularTopics
};
