const { Sequelize } = require("sequelize");

;

const db = new Sequelize("studentregistration", "root", "A23o38567", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;


