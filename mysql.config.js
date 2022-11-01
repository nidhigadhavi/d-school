const mysql = require("mysql");
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "d-school",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};