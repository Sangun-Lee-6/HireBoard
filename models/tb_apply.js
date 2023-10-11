const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_apply', {
    ApplyId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: "ApplyId_UNIQUE"
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tb_user',
        key: 'UserId'
      }
    },
    JobBoardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tb_jobboard',
        key: 'JobBoardId'
      }
    }
  }, {
    sequelize,
    tableName: 'tb_apply',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserId" },
          { name: "JobBoardId" },
        ]
      },
      {
        name: "ApplyId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ApplyId" },
        ]
      },
      {
        name: "fk_Apply_JobBoard_idx",
        using: "BTREE",
        fields: [
          { name: "JobBoardId" },
        ]
      },
    ]
  });
};
