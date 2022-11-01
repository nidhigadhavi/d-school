const db =  require("../models");
const Faq = db.faq;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log("...Create Faq" , req.body);
    Faq.create(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Users."
      });
    });
}

exports.findAll = (req, res) => {
    console.log("Find All Faq");
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Faq.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Userss."
        });
      });
  };

  exports.findOne = (req, res) => {
    console.log("Find Record" , req.params);
    const id = req.params.id;  
    Faq.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Users with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Users with id=" + id
        });
      });
  };
  

  exports.update = (req, res) => {
    const id = req.params.id;
  
    Faq.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Faq was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Faq with id=${id}. Maybe Faq was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Faq with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Faq.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Faq was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Faq with id=${id}. Maybe Faq was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Faq with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    console.log("into the  delete all");
    Faq.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Faqs were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Faqs."
        });
      });
  };

  exports.findAllActive = (req, res) => {
    Faq.findAll({ where: { active: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Faq."
        });
      });
  };