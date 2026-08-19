const { Sequelize } = require("sequelize");
const config = require("../config/database.js");
const environment = "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: dbConfig.dialect,
    host: dbConfig.host,
  }
);

module.exports = sequelize;
