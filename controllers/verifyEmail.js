const verifyService = require("../services/verifyEmail");

exports.verifyEmail = (req, res) => {
    var id = req.params.id;
    var link = "http://localhost:8080/login";
    verifyService.updateEmailVerify(id).then(response => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`<p>Your email has been verified successfully</p><span><a href=${link} target="_blank" >Click</a> to redirect to login screen</span>`);
    })
};
