const GITHUB_TOPICS = require("../models/githubTopics");
const FAVOURITE_TOPICS = require("../models/userFavouriteTopics");

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

function addToFavourite(topicDetails) {
  let topicInformation = topicDetails;
  console.log(topicDetails,'topicDetails')
  let isLiked;
  return new Promise(function(resolve, reject){
    GITHUB_TOPICS.findOne({_id: topicInformation.topicId}).then(topic => {
      console.log(topic,'topic')
      // const favourites = new FAVOURITE_TOPICS(topicInformation);
      FAVOURITE_TOPICS.find({topicId: topicInformation.topicId}).then(data => {
        console.log(data,'addddd')
        if(data){
          const favourites = new FAVOURITE_TOPICS(topicInformation);
          if(topicInformation.like === true){
            console.log("in if")
            isLiked = true;
          }else{
            console.log("in else")
            isLiked = false;
          }
          favourites.update({like: isLiked});
          console.log("updated");

          FAVOURITE_TOPICS.find().then(data => {
            console.log(data,'dataa')
          })

        }else{
          const favourites = new FAVOURITE_TOPICS(topicInformation);
            favourites.save();
            console.log("added to favourite ");

            FAVOURITE_TOPICS.find().then(data => {
              console.log(data,'dataa')
            })
        }
      }).catch((err) => {
        console.log(err,'err')
      })

    }).catch((err) => {
      console.log(err,'errprr')
    })
  })
}

module.exports = {
  saveTopic,
  getAllTopics,
  addToFavourite
};
