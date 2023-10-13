const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_experiencelevel', {
    ExperienceLevelId: {
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true
    },
    ExperienceLevelName: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_experiencelevel',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ExperienceLevelId" },
        ]
      },
      {
        name: "ExperienceLevelId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ExperienceLevelId" },
        ]
      },
    ]
  });
};
