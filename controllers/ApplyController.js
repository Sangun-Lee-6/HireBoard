const db = require("../models");
const { sequelize } = db;
const Apply = db.tb_apply;

const applyJobBoard = async (req, res) => {
  try {
    const userId = req.body.userId;
    const jobBoardId = req.body.jobBoardId;

    const existingApplication = await Apply.findOne({
      where: {
        UserId: userId,
        JobBoardId: jobBoardId,
      },
    });

    if (existingApplication) {
      return res.status(409).send("You have already applied for this job.");
    }

    const application = await Apply.create({
      UserId: userId,
      JobBoardId: jobBoardId,
    });

    res.status(201);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error applying for the job");
  }
};

module.exports = { applyJobBoard };
