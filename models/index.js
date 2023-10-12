const { Sequelize } = require("sequelize");
const initModels = require("./init-models"); // init-models.js에서 메서드를 가져온다.

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

// new Sequelize를 통해 MySQL 연결 객체를 생성한다.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// 모델과 테이블간의 관계가 맺어진다.
const models = initModels(sequelize);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB Connected...");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = {
  ...models,
  sequelize,
};
