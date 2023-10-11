const UserController = require("../controllers/UserController.js");
const router = require("express").Router();

router.post("/addUser", UserController.addUser);
router.get("/allUsers", UserController.getAllUsers);
router.get("/:id", UserController.getUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
