const db = require("../models");
const User = db.tb_user;

const addUser = async (req, res) => {
  try {
    let info = {
      UserName: req.body.username,
      Password: req.body.password,
    };

    const user = await User.create(info);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding user");
  }
};

const getAllUsers = async (req, res) => {
  try {
    let users = await User.findAll({});
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching users');
  }
};

module.exports = {
  addUser,
  getAllUsers,
};
