const db = require("../models");
const User = db.tb_user;

const addUser = async (req, res) => {
  try {
    let info = {
      UserName: req.body.username,
      Password: req.body.password,
    };

    const user = await User.create(info);
    res.status(201);
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

const getUser = async (req, res) => {
  try {
    let UserId = req.params.id;
    let user = await User.findOne({ where: { UserId: UserId } });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching user');
  }
};

const updateUser = async (req, res) => {
  try {
    let UserId = req.params.id;
    const updatedRows = await User.update(req.body, { where: { UserId: UserId } });

    if (updatedRows[0] === 0) {
      res.status(404).send('User not found');
    } else {
      res.status(201);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating user');
  }
};

const deleteUser = async (req, res) => {
  try {
    let UserId = req.params.id;
    const deletedRows = await User.destroy({ where: { UserId: UserId } });

    if (deletedRows === 0) {
      res.status(404).send('User not found');
    } else {
      res.status(200).send('User is deleted');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error deleting user');
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
