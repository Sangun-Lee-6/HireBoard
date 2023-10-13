const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_company', {
    CompanyId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CompanyName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Country: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Region: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_company',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CompanyId" },
        ]
      },
      {
        name: "CompanyId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CompanyId" },
        ]
      },
    ]
  });
};
