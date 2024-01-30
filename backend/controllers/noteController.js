const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");

// @desc Get all notes
// @route GET/notes
// @access Private

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().select().lean();
  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }
});

// @desc Create new note
// @route POST/notes
// @access Private

const createNewNote = asyncHandler(async (req, res) => {});

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
