const db = require("../models");
const { sequelize } = db;
const JobBoard = db.tb_jobboard;
const Company = db.tb_company;
const { getAllJobBoardsQuery } = require("../sqlQueries/jobBoardQueries");

const registerJobBoard = async (req, res) => {
  try {
    let info = {
      JobBoardName: req.body.JobBoardName,
      CompanyId: req.body.CompanyId, // fk
      RequiredTech: req.body.RequiredTech,
      JobDescription: req.body.JobDescription,
      RecruitmentReward: req.body.RecruitmentReward,
      PositionId: req.body.PositionId, // fk
    };

    const jobBoard = await JobBoard.create(info);
    res.status(200).send(jobBoard);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding job board");
  }
};

const updateJobBoard = async (req, res) => {
  try {
    let JobBoardId = req.params.JobBoardId;
    const updatedRows = await JobBoard.update(req.body, {
      where: { JobBoardId: JobBoardId },
    });

    if (updatedRows[0] === 0) {
      res.status(404).send("JobBoard not found");
    } else {
      res.status(200).send("JobBoard updated successfully");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating user");
  }
};

const deleteJobBoard = async (req, res) => {
  try {
    let JobBoardId = req.params.JobBoardId;
    const deletedRows = await JobBoard.destroy({
      where: { JobBoardId: JobBoardId },
    });

    if (deletedRows === 0) {
      res.status(404).send("JobBoard not found");
    } else {
      res.status(200).send("JobBoard is deleted");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting job board");
  }
};

/**ORM을 사용하니 코드가 복잡해졌음, 여기서 원하는 데이터 형태로 가져오려면 가공을 더 해야했음 */
// const getAllJobBoards = async (req, res) => {
//   try {
//     let jobboards = await JobBoard.findAll({
//       include: [
//         {
//           model: Company,
//           as: 'Company',
//           attributes: { exclude: ["CompanyId"] },
//         },
//       ],
//     });
//     res.status(200).send(jobboards);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error fetching jobboards");
//   }
// };

const getAllJobBoards = async (req, res) => {
  try {
    let jobboards = await sequelize.query(getAllJobBoardsQuery, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).send(jobboards);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching jobboards");
  }
};

module.exports = {
  registerJobBoard,
  updateJobBoard,
  deleteJobBoard,
  getAllJobBoards,
};
