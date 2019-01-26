const GITHUB_TOPICS = require("../models/githubTopics");
const FAVOURITE_TOPICS = require("../models/userFavouriteTopics");
const _ = require('lodash');

function addToFavourite(topicDetails) {
  return new Promise(function(resolve, reject){
    let topicInformation = topicDetails;
    GITHUB_TOPICS.findOne({_id: topicInformation.topicId}).then(topic => {
      if(!topicInformation.like){
          return resolve(removeFavourite(topicInformation));
      }else{
        return resolve(saveToFavourites(topicInformation, topic));
      }
    }).catch((err) => {
      console.log(err,'errprr')
    })
  })
}

function removeFavourite(topicInformation) {
  return new Promise(function(resolve, reject){
    FAVOURITE_TOPICS.find({ $and: [ { topicId: topicInformation.topicId }, { userId: topicInformation.userId } ] })
    .then(data => {
      let topicsData = data[0];
      if(data.length) {
          return resolve(updateFavouriteTopic(topicsData))
      }
    }).catch((err) => {
      console.log(err,'err')
    })
  })
}

function updateFavouriteTopic(topicsData) {
  return new Promise(function(resolve, reject){
    FAVOURITE_TOPICS.deleteOne( { _id: topicsData._id } ).then(data => {
      return resolve({
        'message': 'Topic removed from favourites'
      })
    }).catch((err) => {
      return reject({
        'message': 'Unable to remove topic from favourites'
      })
    })
  })
}

function saveToFavourites(topicInformation, topic) {
  return new Promise(function(resolve, reject){
    topicInformation.desc = topic.desc;
    topicInformation.title = topic.title;
    const favourites = new FAVOURITE_TOPICS(topicInformation);
    favourites.save().then(data => {
      return resolve({
        'message': 'Topic added to favourite'
      })
    }).catch((err) => {
      return reject({
        'message': 'Unable to add topic to favourites'
      })
    })
  })
}

function favouriteTopics(userId) {
  return new Promise(function(resolve, reject) {
    var data = {};
    FAVOURITE_TOPICS.find({userId: userId}).then(favouriteTopics => {
      data.favouriteTopicsList = favouriteTopics;
      data.message = 'favourite topics list'
      return resolve(data);
    }).catch((err) =>{
      return reject(err);
    })
  });
}

module.exports = {
  addToFavourite,
  favouriteTopics
};
