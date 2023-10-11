const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_jobboard', {
    JobBoardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    JobBoardName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    CompanyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tb_company',
        key: 'CompanyId'
      }
    },
    RequiredTech: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    JobDescription: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    RecruitmentReward: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    PositionId: {
      type: DataTypes.TINYINT,
      allowNull: false,
      references: {
        model: 'tb_position',
        key: 'PositionId'
      }
    }
  }, {
    sequelize,
    tableName: 'tb_jobboard',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "JobBoardId" },
        ]
      },
      {
        name: "JobBoardId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "JobBoardId" },
        ]
      },
      {
        name: "TB_JobBoard_idx",
        using: "BTREE",
        fields: [
          { name: "CompanyId" },
        ]
      },
      {
        name: "fk_JobBoard_Position_idx",
        using: "BTREE",
        fields: [
          { name: "PositionId" },
        ]
      },
    ]
  });
};
