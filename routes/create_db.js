const createDb = require("../controllers/create_db.js");
const db = createDb();

module.exports = app => {
  app.route("/create_db").post((req, res) => {
    db.createDb(cb => {
      res.json(cb);
    });
  });
};
