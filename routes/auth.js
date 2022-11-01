var express = require("express");
var AuthRouter = require("express").Router();
/* GET users listing. */
const auth = require("../controller/auth.controller");
const authMiddleWare = require("../middleware/auh.middleware");

// Create a new Tutorial
AuthRouter.post("/login", authMiddleWare.validataLogin, auth.login);
AuthRouter.post("/logout", auth.logout);
AuthRouter.post("/signup", authMiddleWare.validataRegister, auth.signUp);
AuthRouter.post("/forgot-password", auth.forgotPassword);
AuthRouter.post("/reset-password", auth.resetPassword);
module.exports = AuthRouter;
