const GITHUB_TOPICS = require("../models/githubTopics");

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

module.exports = {
  saveTopic
};
