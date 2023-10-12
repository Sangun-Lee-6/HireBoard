const db = require("../models");
const { sequelize } = db;
const Apply = db.tb_apply;

const applyJobBoard = async (req, res) => {
  try {
    const userId = req.body.UserId;
    const jobBoardId = req.body.JobBoardId;

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

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error applying for the job");
  }
};

module.exports = { applyJobBoard };
