import Note from "../models/Note.js";

//Get all notes
export const getNotes = async (req, res) => {
  try {
    const Notes = await Note.find().sort({ createdAt: -1 });
    res.json(Notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//POST create a note
export const createNote = async (req, res) => {
  try {
    const note = new Note(req.body);
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//PUT update a note
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//DELETE a note
export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
