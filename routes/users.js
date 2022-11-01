var express = require("express");

/* GET users listing. */
const user = require("../controller/user.controller");
const auth = require("../controller/auth.controller");
const multer = require("multer");

var router = require("express").Router();
const { validationResult } = require("express-validator/check");
const { MulterError } = require("multer");

// Create a new Tutorial
router.post(
  "/",
//   user.validate("createUser"),
//   (req, res, next) => {
//     console.log("into the create user api " , req.body);
//     const myValidationResult = validationResult.withDefaults({
//       formatter: (error) => {
//         console.log(">>>" , error)
//         return {
//           message: error.msg,
//         };
//       },
//     });
// // 
//     const errors = myValidationResult(req);
//     console.log("error occure in API!!!", errors);
//     if (!errors) {
//       next();
//     } else {
//       res.send({ status: 402, message: errors.array() });
//     }
//   },
  auth.signUp
);

// Retrieve all user
router.get("/", user.findAll);

// Retrieve all published user
router.get("/active", user.findAllActive);

// Retrieve a single Tutorial with id
router.get("/:id", user.findOne);

// Update a Tutorial with id
router.put("/:id", user.update);

// Delete a Tutorial with id
router.delete("/:id", user.delete);

// Delete all user
router.delete("/", user.deleteAll);

//send email
router.post("/sendemail", user.sendEmail);

//upload file
const upload = multer({
  dest: "./public/user_upload",
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Invalid mime type"));
    }
  },
});
const uploadSingleImage = upload.array("file", 3);

router.post("/upload", (req, res, next) => {
  uploadSingleImage(req, res, (err) => {
    console.log("into the upload error!!!", err);
    res.status(500).send({ message: err });
  }),
    function (req, res) {
      res.status(200).send({
        message: "file uploaded!",
      });
    };
});

module.exports = router;
