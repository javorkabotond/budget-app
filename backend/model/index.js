const databaseConfig = require("../config/databaseConfig");
const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize(
  databaseConfig.DB,
  databaseConfig.USER,
  databaseConfig.PASSWORD,
  {
    host: databaseConfig.HOST,
    dialect: databaseConfig.dialect,
    port: databaseConfig.port,
    operatorsAliases: false,

    pool: {
      max: databaseConfig.pool.max,
      min: databaseConfig.pool.min,
      acquire: databaseConfig.pool.acquire,
      idle: databaseConfig.pool.idle,
    },
  }
);
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorials = require("./budgetModel")(sequelize, Sequelize);
module.exports = db;
