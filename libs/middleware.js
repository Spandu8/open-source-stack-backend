var bodyParser = require('body-parser')
var cors = require('cors');
module.exports = app => {
  
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); 
};