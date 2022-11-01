const db = require("../models");
const ApiSuccessResponse = require("../utility/apiSucessResonse");
const Article = db.article;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  Article.create(req.body)
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

exports.findOne = (req, res) => {
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

exports.update = (req, res) => {
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

exports.delete = (req, res) => {
  const id = req.params.id;

  Article.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Article was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Article with id=${id}. Maybe Article was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Article with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  console.log("into the  delete all");
  Article.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Articles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Articles.",
      });
    });
};

exports.findAllActive = (req, res) => {
  Article.findAll({ where: { active: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Article.",
      });
    });
};
