var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favouriteTopics = new Schema({
    topicId: {
        type: String,
        required: true
    },
    like: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String
    }
});

module.exports = mongoose.model('FAVOURITE_TOPICS', favouriteTopics);
