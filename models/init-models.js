var DataTypes = require("sequelize").DataTypes;
var _tb_apply = require("./tb_apply");
var _tb_company = require("./tb_company");
var _tb_experiencelevel = require("./tb_experiencelevel");
var _tb_jobboard = require("./tb_jobboard");
var _tb_part = require("./tb_part");
var _tb_position = require("./tb_position");
var _tb_user = require("./tb_user");

function initModels(sequelize) {
  var tb_apply = _tb_apply(sequelize, DataTypes);
  var tb_company = _tb_company(sequelize, DataTypes);
  var tb_experiencelevel = _tb_experiencelevel(sequelize, DataTypes);
  var tb_jobboard = _tb_jobboard(sequelize, DataTypes);
  var tb_part = _tb_part(sequelize, DataTypes);
  var tb_position = _tb_position(sequelize, DataTypes);
  var tb_user = _tb_user(sequelize, DataTypes);

  tb_jobboard.belongsToMany(tb_user, { as: 'UserId_tb_users', through: tb_apply, foreignKey: "JobBoardId", otherKey: "UserId" });
  tb_user.belongsToMany(tb_jobboard, { as: 'JobBoardId_tb_jobboards', through: tb_apply, foreignKey: "UserId", otherKey: "JobBoardId" });
  tb_jobboard.belongsTo(tb_company, { as: "Company", foreignKey: "CompanyId"});
  tb_company.hasMany(tb_jobboard, { as: "tb_jobboards", foreignKey: "CompanyId"});
  tb_position.belongsTo(tb_experiencelevel, { as: "ExperienceLevel", foreignKey: "ExperienceLevelId"});
  tb_experiencelevel.hasMany(tb_position, { as: "tb_positions", foreignKey: "ExperienceLevelId"});
  tb_apply.belongsTo(tb_jobboard, { as: "JobBoard", foreignKey: "JobBoardId"});
  tb_jobboard.hasMany(tb_apply, { as: "tb_applies", foreignKey: "JobBoardId"});
  tb_position.belongsTo(tb_part, { as: "Part", foreignKey: "PartId"});
  tb_part.hasMany(tb_position, { as: "tb_positions", foreignKey: "PartId"});
  tb_jobboard.belongsTo(tb_position, { as: "Position", foreignKey: "PositionId"});
  tb_position.hasMany(tb_jobboard, { as: "tb_jobboards", foreignKey: "PositionId"});
  tb_apply.belongsTo(tb_user, { as: "User", foreignKey: "UserId"});
  tb_user.hasMany(tb_apply, { as: "tb_applies", foreignKey: "UserId"});

  return {
    tb_apply,
    tb_company,
    tb_experiencelevel,
    tb_jobboard,
    tb_part,
    tb_position,
    tb_user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
