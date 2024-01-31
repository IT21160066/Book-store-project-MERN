const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt"); //hash the password before we save it

// @desc Get all users
// @route GET/users
// @access Private

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

// @desc Create new user
// @route POST/users
// @access Private

const createNewUser = asyncHandler(async (req, res) => {
  const { userName, password, roles } = req.body;

  //confirm data
  if (!userName || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fileds are required" });
  }

  //check for duplicates
  const duplicate = await User.findOne({ userName }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate UserName" });
  }

  //hash password
  const hashedPwd = await bcrypt.hash(password, 10); //salt rounds
  const userObject = { userName, password: hashedPwd, roles };

  //create and store new user
  const user = await User.create(userObject);

  if (user) {
    //created
    res.status(201).json({ message: `New user ${userName} created` });
  } else {
    res.status(400).jsn({ message: "Invalid user data recived" });
  }
});

// @desc Update a user
// @route PATCH/users
// @access Private

const updateUser = asyncHandler(async (req, res) => {
  const { id, userName, roles, activeStatus, password } = req.body;

  //confirm data
  if (
    !id ||
    !userName ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof activeStatus !== "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  //check for duplicate
  const duplicate = await User.findOne({ userName }).lean().exec();

  //allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate UserName" });
  }

  user.userName = userName;
  user.roles = roles;
  user.activeStatus = activeStatus;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  //here we need the document
  //if we call lean on user we don't get save method
  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.userName} updated` });
});

// @desc Delete a user
// @route DELETE/users
// @access Private

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  //we dont want to delte user if they have notes assigned
  const notes = await Note.findOne({ user: id }).lean().exec();
  if (notes) {
    return res.status(400).json({ message: "User has assigned notes" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `userName ${result.userName} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
