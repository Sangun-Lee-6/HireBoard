const JobBoardController = require("../controllers/JobBoardController.js");
const router = require("express").Router();

router.post("/", JobBoardController.registerJobBoard);
router.put("/:JobBoardId", JobBoardController.updateJobBoard);
router.delete("/:JobBoardId", JobBoardController.deleteJobBoard);
router.get("/all", JobBoardController.getAllJobBoards);
router.get("/:JobBoardId", JobBoardController.getJobBoard);
router.get("/search/:keyword", JobBoardController.searchJobBoard);

module.exports = router;
