var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favouriteTopicsSchema = new Schema({
    userId: {
      type: String
    },
    isFavourite: {
      type: Boolean,
      default: false
    },
    topicId: {
      type: String
    }
})

module.exports = mongoose.model('favouriteTopics', favouriteTopicsSchema);
