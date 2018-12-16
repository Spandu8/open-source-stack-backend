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
    }
});

// registrationSchema.pre('save', (next) => {
//   var user = this;
//   bcrypt.hash(user.password, (err, hash) => {
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   })
// });



module.exports = mongoose.model('users', registrationSchema);
