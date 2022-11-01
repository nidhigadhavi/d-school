var express = require("express");

/* GET users listing. */
const teacher = require("../controller/teacher.controller");

var router = require("express").Router();

// Create a new Tutorial
router.post("/", teacher.create);

router.get("/pdf-gen" , teacher.generatePDF);

// Retrieve all teacher
router.get("/", teacher.findAll);

// Retrieve all published teacher
router.get("/active", teacher.findAllActive);

// Retrieve a single Tutorial with id
router.get("/:id", teacher.findOne);

// Update a Tutorial with id
router.put("/:id", teacher.update);

// Delete a Tutorial with id
router.delete("/:id", teacher.delete);

// Delete all teacher
router.delete("/", teacher.deleteAll);

module.exports = router;
