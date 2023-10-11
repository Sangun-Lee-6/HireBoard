const { Sequelize, DataTypes } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// db.users = require("./User")(sequelize, DataTypes);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB Connected...");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = db;
