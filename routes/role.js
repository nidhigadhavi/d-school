var express = require("express");

/* GET users listing. */
const role = require("../controller/role.controller");

var router = require("express").Router();

// Create a new Tutorial
router.post("/", (req, res, next) => {
    console.log("into the middleare index", req);
    next();
  },
  role.create
);

// Retrieve all role
router.get("/", role.findAll);

// Retrieve all published role
// router.get("/active", role.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", role.findOne);

// Update a Tutorial with id
router.put("/:id", role.update);

// Delete a Tutorial with id
router.delete("/:id", role.delete);

// Delete all role
router.delete("/", role.deleteAll);

module.exports = router;
