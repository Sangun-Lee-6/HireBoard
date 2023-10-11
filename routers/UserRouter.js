const UserController = require("../controllers/UserController.js");
const router = require("express").Router();

router.post("/addUser", UserController.addUser);
router.get("/allUsers", UserController.getAllUsers);

module.exports = router;
