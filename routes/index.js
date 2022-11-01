var express = require("express");
var router = express.Router();
var AuthRouter = require("./auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login-page", function (req, res, next) {
  console.log("<<<<<into login>>>>>....");
  // res.send("unAuthorsed user!!!!");
  res.render("login");
});

router.get("/confirm-account" , function(req, res){
  console.log("into the confirm account");
  res.render("confrim-account");
})

router.get("/dashboard", function (req, res, next) {
  console.log("into the dashboard.....");
  res.send("User Authorosed!!!");
  res.render("dashboard");
});

// router.get("/api/v1", AuthRouter);
module.exports = router;
