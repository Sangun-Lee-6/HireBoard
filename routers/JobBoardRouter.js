const JobBoardController = require("../controllers/JobBoardController.js");
const router = require("express").Router();

router.post("/JobBoard", JobBoardController.registerJobBoard);
router.put("/JobBoard/:JobBoardId", JobBoardController.updateJobBoard);
router.delete("/JobBoard/:JobBoardId", JobBoardController.deleteJobBoard);

module.exports = router;
