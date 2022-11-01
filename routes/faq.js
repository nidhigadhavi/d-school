var express = require("express");

/* GET users listing. */
const faq = require("../controller/faq.controller");

var router = require("express").Router();

// Create a new Tutorial
router.post("/", faq.create);

// Retrieve all faq
router.get("/", faq.findAll);

// Retrieve all published faq
router.get("/active", faq.findAllActive);

// Retrieve a single Tutorial with id
router.get("/:id", faq.findOne);

// Update a Tutorial with id
router.put("/:id", faq.update);

// Delete a Tutorial with id
router.delete("/:id", faq.delete);

// Delete all faq
router.delete("/", faq.deleteAll);

module.exports = router;
