const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      default: "Employee",
    },
  ],
  activeStatus: {
    type: Boolean,
    default: true, //any new user automatically be active
  },
});

module.exports = mongoose.model("User", userSchema);
