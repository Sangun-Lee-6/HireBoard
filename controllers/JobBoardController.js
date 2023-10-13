const db = require("../models");
const { sequelize } = db;
const JobBoard = db.tb_jobboard;
const cache = require("memory-cache");
const {
  getAllJobBoardsQuery,
  getJobBoardQuery,
  searchJobBoardQuery,
} = require("../sqlQueries/jobBoardQueries");

const registerJobBoard = async (req, res) => {
  try {
    let info = {
      JobBoardName: req.body.JobBoardName,
      CompanyId: req.body.CompanyId,
      RequiredTech: req.body.RequiredTech,
      JobDescription: req.body.JobDescription,
      RecruitmentReward: req.body.RecruitmentReward,
      PositionId: req.body.PositionId,
    };

    /**에러처리: request에 빠진 항목이 있다면 400 */
    if (!info.JobBoardName) return res.sendStatus(400);
    if (!info.CompanyId) return res.sendStatus(400);
    if (!info.RequiredTech) return res.sendStatus(400);
    if (!info.JobDescription) return res.sendStatus(400);
    if (!info.RecruitmentReward) return res.sendStatus(400);
    if (!info.PositionId) return res.sendStatus(400);

    /**에러처리: JobBoardName이 중복된다면 409 */
    const existingJobBoard = await JobBoard.findOne({
      where: { JobBoardName: info.JobBoardName },
    });
    if (existingJobBoard) {
      return res.status(409).send("JobBoardName is already in use");
    }

    const jobBoard = await JobBoard.create(info);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding job board");
  }
};

const updateJobBoard = async (req, res) => {
  try {
    let JobBoardId = req.params.JobBoardId;

    /**에러처리: JobBoardId가 정수가 아닌 경우 400 */
    if (!Number.isInteger(parseInt(JobBoardId))) {
      return res
        .status(400)
        .send("Invalid JobBoardId. It should be an integer.");
    }

    /**에러처리: CompanyId를 수정하려는 경우 400 */
    if (req.body.CompanyId)
      return res.status(400).send("CompanyId cannot be modified.");

    /**에러처리: 수정된 내용을 또 보내는 경우 400 */
    const currentRequestCacheKey = `jobboard-${JobBoardId}-${JSON.stringify(
      req.body
    )}`;
    const previousRequestBody = cache.get(currentRequestCacheKey);

    if (previousRequestBody) {
      return res.status(400).send("You've sent the same modification request.");
    }

    /**에러처리: JobBoardId가 DB에 없다면 404 */
    const existingJobBoard = await JobBoard.findOne({
      where: { JobBoardId: JobBoardId },
    });

    if (!existingJobBoard) {
      return res.status(404).send("JobBoard not found");
    }

    /**채용공고 수정 */
    const updatedRows = await JobBoard.update(req.body, {
      where: { JobBoardId: JobBoardId },
    });

    if (updatedRows[0] === 0) {
      res.status(404).send("No changes were made");
    } else {
      cache.put(currentRequestCacheKey, req.body);
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating user");
  }
};

const deleteJobBoard = async (req, res) => {
  try {
    let JobBoardId = req.params.JobBoardId;

    /**에러처리: JobBoardId가 정수가 아닌 경우 400 */
    if (!Number.isInteger(parseInt(JobBoardId))) {
      return res
        .status(400)
        .send("Invalid JobBoardId. It should be an integer.");
    }

    /**에러처리: JobBoardId가 DB에 없다면 404 */
    const existingJobBoard = await JobBoard.findOne({
      where: { JobBoardId: JobBoardId },
    });

    if (!existingJobBoard) {
      return res.status(404).send("JobBoard not found");
    }

    /**채용공고 삭제 */
    const deletedRows = await JobBoard.destroy({
      where: { JobBoardId: JobBoardId },
    });

    if (deletedRows === 0) {
      res.status(404).send("JobBoard not found");
    } else {
      res.sendStatus(200);
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

const getJobBoard = async (req, res) => {
  try {
    let JobBoardId = req.params.JobBoardId;
    let jobBoards = await sequelize.query(getJobBoardQuery, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { JobBoardId: JobBoardId },
    });

    if (jobBoards && jobBoards.length > 0) {
      res.status(200).send(jobBoards[0]);
    } else {
      res.status(404).send("JobBoard not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching jobboard");
  }
};

const searchJobBoard = async (req, res) => {
  try {
    let keyword = `%${req.params.keyword}%`; // Use req.params.keyword
    const jobboards = await sequelize.query(searchJobBoardQuery, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { searchTerm: keyword },
    });
    res.status(200).send(jobboards);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error searching jobboards");
  }
};

module.exports = {
  registerJobBoard,
  updateJobBoard,
  deleteJobBoard,
  getAllJobBoards,
  getJobBoard,
  searchJobBoard,
};
