const UserController = require("../controllers/UserController.js");
const router = require("express").Router();

router.post("/addUser", UserController.addUser);

module.exports = router;
