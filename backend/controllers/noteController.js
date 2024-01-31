const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");

// @desc Get all notes
// @route GET/notes
// @access Private

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();
  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }

  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.userName };
    })
  );
  res.json(notesWithUser);
});

// @desc Create new note
// @route POST/notes
// @access Private

const createNewNote = asyncHandler(async (req, res) => {
  const { title, text } = req.body;
});

// @desc Update a note
// @route PATCH/notes
// @access Private

const updateNote = asyncHandler(async (req, res) => {});

// @desc Delete a note
// @route DELETE/notes
// @access Private

const deleteNote = asyncHandler(async (req, res) => {});

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
};
