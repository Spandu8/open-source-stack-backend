const register = require("../controllers/registerController.js");
const rg = register();

module.exports = app => {
  app.route('/registerUser').post((req,res) => {
      rg.register(cb => {
        res.json(cb);
      })
  })
}
