const JobBoardController = require("../controllers/JobBoardController.js");
const router = require("express").Router();

router.post("/JobBoard", JobBoardController.registerJobBoard);

module.exports = router;
