const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// this plugin create seperate collection called counter where it tracks the
// sequential number and continues to our notes

noteSchema.plugin(AutoIncrement, {
  inc_field: "ticket", //create ticket field inside note schema
  id: "ticketNums", //seperate collection called counter will created and we see id in there
  start_seq: 500,
});

module.exports = mongoose.model("Note", noteSchema);
