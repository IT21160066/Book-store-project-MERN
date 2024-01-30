const User = require("../models/User");
const User = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt"); //hash the password before we save it
const { use } = require("../routes/userRoutes");

// @desc Get all users
// @route GET/users
// @access Private

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

// @desc Create new user
// @route POST/users
// @access Private

const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  //confirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fileds are required" });
  }

  //check for duplicates
  const duplicate = await User.findOne({ userName }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  //hash password
  const hashedPwd = await bcrypt.hash(password, 10); //salt rounds
  const userObject = { username, password: hashedPwd, roles };

  //create and store new user
  const user = await User.create(userObject);

  if (user) {
    //created
    res.status(201).json({ message: `New user ${username} created]` });
  } else {
    res.status(400).jsn({ message: "Invalid user data recived" });
  }
});

// @desc Update a user
// @route PATCH/users
// @access Private

const updateUser = asyncHandler(async (req, res) => {});

// @desc Delete a user
// @route DELETE/users
// @access Private

const deleteUser = asyncHandler(async (req, res) => {});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
