const passport = require("passport");
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const {
  sendEmailWithAttachment,
  sendMail,
} = require("../utility/email-services/sendEmail");
const {
  Api500ErrorRes,
  Api404ErrorRes,
  Api400ErrorRes,
  Api401ErrorRes,
} = require("../utility/apiErrorResponse");
// const { now } = require("sequelize/types/utils");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.login = (req, res) => {
  var session = req.session;
  session.userData = req.body.email;
  Users.findOne({ where: { email: req.body.email } })
    .then((data) => {
      if (data.length == 0) {
        Api401ErrorRes();
      } else {
        bcrypt.compare(req.body.password, data.password, (bErr, bResult) => {
          if (bErr) {
            Api401ErrorRes();
          } else {
            const tocken = jwt.sign(
              {
                username: req.body.email,
                userid: data.id,
              },
              "SECRETKEY",
              { expiresIn: "7d" }
            );
            Users.update({ last_login: Date.now() }, { where: { id: data.id } })
              .then((data, err) => {
                if (err) {
                  Api500ErrorRes();
                } else {
                  ApiSuccessResponse({ tocken: tocken }, "User Login");
                }
              })
              .catch((err) => {
                Api500ErrorRes();
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "something went wrnog.",
        err: err,
      });
    });
};

exports.signUp = (req, res) => {
  console.log("!!sign UP", req.body);
  Users.findAll({ where: { email: req.body.email } })
    .then((data) => {
      if (data.length == 0) {
        let userData = req.body;
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            res.status(500).send({
              msg: "Something Went Wrong!! in user generate salt func",
              err: err,
            });
          }
          bcrypt.hash(req.body.password, salt, (err, val) => {
            if (val) {
              userData.password = val;
              Users.create(userData)
                .then((data) => {                
                  fs.readFile("./upload/fileDownload17.pdf", function (err, data) {
                    console.log(">>>>", data , err);
                    let attachments = [
                      {
                        filename: "fileDownload17.pdf",
                        content:  data.toString('base64'),
                        type: "application/pdf",
                        disposition: "attachment",
                        contentId: "myId",
                      },
                    ];
                    sendEmailWithAttachment(
                      userData.email,
                      userData.name,
                      attachments,
                      () => {
                        console.log("mail sent!");
                        res.status(200).send({
                          msg: "User created please check your email"                          
                        });
                      }
                    );
                  });
                })
                .catch((err) => {
                  res.status(401).send({
                    msg: "Something Went Wrong in user create func!!",
                    err: err,
                  });
                });
            } else {
              res.status(401).send({
                msg: "Something Went Wrong!! in user password bcrypt func",
                err: err,
              });
            }
          });
        });
      } else {
        res.status(400).send({
          msg: "user already exist",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Some error occure",
        err: err,
      });
    });
};

exports.logout = (req, res) => {
  console.log("Find All Record");
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Article.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Userss.",
      });
    });
};

exports.forgotPassword = (req, res) => {
  console.log("Find Record", req.params);
  const id = req.params.id;
  Article.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Users with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Users with id=" + id,
      });
    });
};

exports.resetPassword = (req, res) => {
  const id = req.params.id;

  Article.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Article was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Article with id=" + id,
      });
    });
};
