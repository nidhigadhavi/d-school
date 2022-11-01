const db = require("../models");
const pdfGenerator = require("../utility/pdf-generater/pdfgenerater");
const Teacher = db.teacher;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  console.log("crete teacher...", req.body);
  Teacher.create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Users.",
      });
    });
};

exports.findAll = (req, res) => {
  console.log("Find All Record");
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Teacher.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Userss.",
      });
    });
};

exports.findOne = (req, res) => {
  console.log("Find Record", req.params);
  const id = req.params.id;
  Teacher.findByPk(id)
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

exports.update = (req, res) => {
  const id = req.params.id;

  Teacher.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Teacher was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Teacher with id=${id}. Maybe Teacher was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Teacher with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Teacher.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Teacher was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Teacher with id=${id}. Maybe Teacher was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Teacher with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  console.log("into the  delete all");
  Teacher.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Teachers were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Teachers.",
      });
    });
};

exports.findAllActive = (req, res) => {
  Teacher.findAll({ where: { active: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Teacher.",
      });
    });
};

exports.generatePDF = (req, res) => {
    console.log("into the generte pdf from ")
    const pdfGen = new pdfGenerator();
    var file =  pdfGen.generate();
    var response = "please collect the file from the url" + file;
    res.send(response);
}   
