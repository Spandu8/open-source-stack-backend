var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var registrationSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    isEmailVerfied: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('users', registrationSchema);
