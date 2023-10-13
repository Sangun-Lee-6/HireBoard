const UserController = require("../controllers/UserController.js");
const router = require("express").Router();

router.post("/", UserController.addUser);
router.get("/all", UserController.getAllUsers);
router.get("/:UserId", UserController.getUser);
router.put("/:UserId", UserController.updateUser);
router.delete("/:UserId", UserController.deleteUser);

module.exports = router;
