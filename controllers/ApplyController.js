const db = require("../models");
const { sequelize } = db;
const Apply = db.tb_apply;
const JobBoard = db.tb_jobboard;

const applyJobBoard = async (req, res) => {
  try {
    const UserId = req.body.UserId;
    const JobBoardId = req.body.JobBoardId;

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

    const existingApplication = await Apply.findOne({
      where: {
        UserId: UserId,
        JobBoardId: JobBoardId,
      },
    });

    /**에러처리: 사용자가 이미 지원한 채용공고인 경우 409 */
    if (existingApplication) {
      return res.status(409).send("You have already applied for this job.");
    }

    const application = await Apply.create({
      UserId: UserId,
      JobBoardId: JobBoardId,
    });

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error applying for the job");
  }
};

module.exports = { applyJobBoard };
