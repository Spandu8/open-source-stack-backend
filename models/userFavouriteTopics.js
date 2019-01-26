var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favouriteTopics = new Schema({
    topicId: {
        type: String,
        required: true
    },
    userId: {
      type: String
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('FAVOURITE_TOPICS', favouriteTopics);
