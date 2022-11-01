var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");
const expressValidator = require("express-validator");

var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var connection = require("./mysql.config");
var indexRouter = require("./routes");
var usersRouter = require("./routes/users");
var tutorialRouter = require("./routes/tutorial");
var articleRouter = require("./routes/article");
var authRouter = require("./routes/auth");
var roleRouter = require("./routes/role");
var teacherRouter = require("./routes/teacher");
var app = express();

var whitelist = ["http://localhost:8000", "http://localhost:8081"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors({ credentials: true }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
// intialise session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
console.log("connect :::", connection);
const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use("/", indexRouter);
app.use(
  "/auth",
  (req, res, next) => {
    console.log("!!! middleware for the auth module!!!!");
    next();
  },
  authRouter
);
app.use("/users", usersRouter);
app.use("/tutorial", tutorialRouter);
app.use("/article", articleRouter);
app.use("/role", roleRouter);
app.use("/teacher" , teacherRouter);

var authFunction = (user, password, done) => {
  console.log("into the auth funciton with passport");
  console.log(user, passward);
  var user = { id: "123123", name: "Nidhi Gadhvi" };
  return done(null, user);
};

passport.use(new LocalStrategy(authFunction));

passport.serializeUser((userObj, done) => {
  console.log("serializeUser!");
  done(null, userObj);
});

passport.deserializeUser((userObj, done) => {
  console.log("deSerializeUser!");
  done(null, userObj);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
// connection.end();
module.exports = app;
