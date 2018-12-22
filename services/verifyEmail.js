const Registration = require("../models/registrationModel");

function updateEmailVerify(id) {
    return new Promise((resolve, reject) => {
        Registration.update({ _id: id },
            { $set:
               {
                isEmailVerfied: true
               }
            }).then(user => {
                return resolve(user);
            })
    });
}

module.exports = {
    updateEmailVerify: updateEmailVerify
}