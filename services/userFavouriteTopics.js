const GITHUB_TOPICS = require("../models/githubTopics");
const FAVOURITE_TOPICS = require("../models/userFavouriteTopics");

function addToFavourite(topicDetails) {
  return new Promise(function(resolve, reject){
    let topicInformation = topicDetails;
    GITHUB_TOPICS.findOne({_id: topicInformation.topicId}).then(topic => {
      return resolve(addTopicToFavourite(topicInformation));
    }).catch((err) => {
      console.log(err,'errprr')
    })
  })
}

function addTopicToFavourite(topicInformation) {
  return new Promise(function(resolve, reject){
    FAVOURITE_TOPICS.find({ $and: [ { topicId: topicInformation.topicId }, { userId: topicInformation.userId } ] }).then(data => {
      let topicsData = data[0];
      if(data.length) {
          return resolve(updateFavouriteTopic(topicsData, topicInformation))
      } else{
          return saveToFavourites(topicInformation);
      }
    }).catch((err) => {
      console.log(err,'err')
    })
  })
}

function updateFavouriteTopic(topicsData, topicInformation) {
  return new Promise(function(resolve, reject){
    FAVOURITE_TOPICS.updateOne( { _id: topicsData._id }, { $set : { isFavourite: topicInformation.isFavourite } } ).then(data => {
      return resolve({
        'message': 'User Favourite updated'
      })
    }).catch((err) => {
      return reject({
        'message': 'Unable to update favourites'
      })
    })
  })
}

function saveToFavourites(topicInformation) {
  return new Promise(function(resolve, reject){
    const favourites = new FAVOURITE_TOPICS(topicInformation);
    favourites.save().then(data => {
      return resolve({
        'message': 'User Favourite updated'
      })
    }).catch((err) => {
      return reject({
        'message': 'Unable to update favourites'
      })
    })
  })
}

function favouriteTopics(userId) {
  return new Promise(function(resolve, reject) {
    FAVOURITE_TOPICS.find({userId: userId}).then(topics => {
      console.log(topics,'topics');
      return resolve(topics);
    }).catch((err) =>{
      return reject(err);
    })
  });
}

module.exports = {
  addToFavourite,
  favouriteTopics
};
