var mongoose = require('mongoose');
module.exports = app => {

  app.mongoose.Schema({
      name: {
          type: String,
          required: true
      },
      email: {
          type: String,
          required: true
      },
      gender: String,
      create_date: {
          type: Date,
          default: Date.now
      }
  });

}
