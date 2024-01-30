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

const createNewUser = asyncHandler(async (req, res) => {});

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
