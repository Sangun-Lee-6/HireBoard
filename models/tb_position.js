const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_position', {
    PositionId: {
      autoIncrement: true,
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true
    },
    PartId: {
      type: DataTypes.TINYINT,
      allowNull: false,
      references: {
        model: 'tb_part',
        key: 'PartId'
      }
    },
    ExperienceLevelId: {
      type: DataTypes.TINYINT,
      allowNull: false,
      references: {
        model: 'tb_experiencelevel',
        key: 'ExperienceLevelId'
      }
    }
  }, {
    sequelize,
    tableName: 'tb_position',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PositionId" },
        ]
      },
      {
        name: "PositionId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PositionId" },
        ]
      },
      {
        name: "fk_Position_Part_idx",
        using: "BTREE",
        fields: [
          { name: "PartId" },
        ]
      },
      {
        name: "fk_Position_ExperienceLevel_idx",
        using: "BTREE",
        fields: [
          { name: "ExperienceLevelId" },
        ]
      },
    ]
  });
};
