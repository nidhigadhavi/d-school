const db = require("../models");
const { check } = require("express-validator/check");
const { NotExtended } = require("http-errors");
const nodemailer = require("nodemailer");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  console.log("<<create::", req.body);
  Users.create(req.body)
    .then((data) => {
      console.log("created !!!", data);
      res.header("Access-Control-Allow-Origin", "*");      
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Users.",
      });
    });
};

exports.findAll = async (req, res) => {
  const name = req.query.name || "";
  const limit = parseInt(req.query.rowsPerPage);
  const page = parseInt(req.query.page);
  var offset = limit * (page - 1);
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  var limitT = parseInt(limit);
  var offsetT = parseInt(offset);
  console.log("find all with name;;", limitT, page, offsetT);
  Users.findAll({
    limitT,
    offsetT,
    where: condition,
  })
    .then((data) => {
      console.log("user::::", data);
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Userss.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Users.findByPk(id)
    .then((data) => {
      if (data) {
        res.header("Access-Control-Allow-Origin", "*");

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

exports.update = (req, res) => {
  const id = req.params.id;
  Users.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.header("Access-Control-Allow-Origin", "*");

        res.send({
          message: "Users was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Users with id=${id}. Maybe Users was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Users with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  console.log("into delete", id);

  Users.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Users was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Users with id=${id}. Maybe Users was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Users with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  console.log("into the  delete all");
  Users.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Userss were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Userss.",
      });
    });
};

exports.findAllActive = (req, res) => {
  Users.findAll({ where: { active: true } })
    .then((data) => {
      console.log(">>>data<<<" , data);
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

exports.sendEmail = (req, res) => {
  console.log("into the send email..", req);
  const transporter = nodemailer.createTransport({
    port: 25, // Postfix uses port 25
    host: "localhost",
    tls: {
      rejectUnauthorized: false,
    },
  });

  var message = {
    from: "gadhavi019@gmail.com",
    to: "nidhi.gadhavi@technostacks.com",
    subject: "Confirm Email",
    text: "Please confirm your email",
    html: "<p>Please confirm your email</p>",
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      // return console.log(error);
      res.send(error);
    }
    res.send(info);
    // console.log("Message sent: %s", info.messageId);
  });
};

exports.validate = (method) => {
  switch (method) {
    case "createUser":
      return [
        check("name", "Name is Required.").exists(),
        check("email", "Email is Required.").exists(),
        check("password", "Password Required.").exists(),
      ];

    default:
      break;
  }
};
