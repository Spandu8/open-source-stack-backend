var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Users = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
      type: String,
      default: false
    },
    imageUrl: {
      type: String,
      required: true
    },
    authToken: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('USERS', Users);
