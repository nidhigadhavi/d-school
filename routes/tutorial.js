var express = require("express");

/* GET users listing. */
const tutorials = require("../controller/tutorial.controller");

var router = require("express").Router();

// Create a new Tutorial
router.post(
  "/",
  (req, res, next) => {
    console.log("into the middlware index", req);
    next();
  },
  tutorials.create
);

// Retrieve all Tutorials
router.get("/", tutorials.findAll);

// Retrieve all published Tutorials
router.get("/published", tutorials.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", tutorials.findOne);

// Update a Tutorial with id
router.put("/:id", tutorials.update);

// Delete a Tutorial with id
router.delete("/:id", tutorials.delete);

// Delete all Tutorials
router.delete("/", tutorials.deleteAll);

module.exports = router;
