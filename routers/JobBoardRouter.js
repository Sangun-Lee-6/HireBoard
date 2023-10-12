const JobBoardController = require("../controllers/JobBoardController.js");
const router = require("express").Router();

router.post("/", JobBoardController.registerJobBoard);
router.put("/:JobBoardId", JobBoardController.updateJobBoard);
router.delete("/:JobBoardId", JobBoardController.deleteJobBoard);
router.get("/all", JobBoardController.getAllJobBoards);

module.exports = router;
