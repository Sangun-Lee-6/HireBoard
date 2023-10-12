const ApplyController = require("../controllers/ApplyController.js");
const router = require("express").Router();

router.post("/", ApplyController.applyJobBoard);

module.exports = router;
