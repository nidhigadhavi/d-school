const jwt = require("jsonwebtoken");
module.exports = {
  validataRegister: (req, res, next) => {
    console.log("into the validation registe", req.body);
    if (!req.body.email || req.body.email.length < 3) {
      return res.status(400).send({
        msg: "email is required !!!",
      });
    }
    if (!req.body.password || req.body.password.length < 3) {
      return res.status(400).send({
        msg: "password is required!!!",
      });
    }
    next();
  },
  validataLogin: (req, res, next) => {
    console.log("into the login valdation!!", req.body);
    if (!req.body.email || req.body.email.length < 3) {
      return res.status(400).send({
        msg: "email is required!!!",
      });
    }
    if (!req.body.password || req.body.password.length < 3) {
      return res.status(400).send({ msg: "password is required!!!" });
    }
    next();
  },
};
