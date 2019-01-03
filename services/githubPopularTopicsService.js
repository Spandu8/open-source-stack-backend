const GITHUB_POPULAR_TOPICS = require("../models/githubPopularTopics");

async function savePopularTopic(data) {
  isTopPopularicSaved(data.title).then(isSaved => {
    if (!isSaved) {
      const topic = new GITHUB_POPULAR_TOPICS(data);
      topic.save().then(res => {
          console.log("Popular Topic saved")
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

module.exports = {
  savePopularTopic
};
