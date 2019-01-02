var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var githubTopics = new Schema({
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('GITHUB_TOPICS', githubTopics);
