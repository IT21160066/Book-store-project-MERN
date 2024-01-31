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
  const { user, title, text } = req.body;

  //confirm data
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check for duplicates
  const duplicate = await Note.findOne({ title }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate Note title" });
  }

  const noteObject = { user, title, text };

  //store new user
  const note = await Note.create(noteObject);

  if (note) {
    res.status(201).json({ message: `New Note ${title} created` });
  } else {
    res.status(400).json({ message: "Invalid Note data recived" });
  }
});

// @desc Update a note
// @route PATCH/notes
// @access Private

const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;

  //confirm data
  if (!id || !user || !title || !text || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fileds are required" });
  }

  //here we need the document
  //if we call lean on user we don't get save method
  const note = await Note.findById(id).exec();
  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  //check for duplicate
  const duplicate = await Note.findOne({ title }).lean().exec();

  //allow updates to original note
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate Note title" });
  }

  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedNote = await note.save();
  res.json({ message: `${updateNote.title} updated` });
});

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
