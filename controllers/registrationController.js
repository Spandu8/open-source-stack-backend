const Registration = require("../models/registrationModel");

exports.registerUser =  (req,res) => {
  var registration = new Registration(req.body);
    registration.save()
      .then(data => {
        res.json({
          message: "User Registered Successfully",
          data: data
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        })
      })
}

exports.login = (req,res) => {
  var registration = new Registration();
  console.log(registration,'registration')
  var userName = req.body.userName;
  var password = req.body.password;
  console.log(req.body,'body')
  registration.getUser(userName).then(data => {
    console.log(data,'data')
    res.send("user fetched")
  })
  .catch(err => {
    res.send("user does not exist");
  })
}
