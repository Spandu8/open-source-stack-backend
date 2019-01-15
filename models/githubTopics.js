var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var githubTopics = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    likes: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String
    }
});

module.exports = mongoose.model('GITHUB_TOPICS', githubTopics);
