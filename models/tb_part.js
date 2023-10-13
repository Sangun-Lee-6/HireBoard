const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_part', {
    PartId: {
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true
    },
    PartName: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_part',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PartId" },
        ]
      },
      {
        name: "PartId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PartId" },
        ]
      },
    ]
  });
};
