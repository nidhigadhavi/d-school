var express = require("express");

/* GET users listing. */
const articles = require("../controller/article.controller");

var router = require("express").Router();

// Create a new Tutorial
router.post("/", articles.create);

// Retrieve all articles
router.get("/", articles.findAll);

// Retrieve all published articles
router.get("/active", articles.findAllActive);

// Retrieve a single Tutorial with id
router.get("/:id", articles.findOne);

// Update a Tutorial with id
router.put("/:id", articles.update);

// Delete a Tutorial with id
router.delete("/:id", articles.delete);

// Delete all articles
router.delete("/", articles.deleteAll);

module.exports = router;
