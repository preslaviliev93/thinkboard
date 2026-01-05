import Note from "../../models/Note.js";

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    displayError(error, res);
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title: title, content: content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    displayError(error, res);
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        content: content,
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: `Note not found` });
    }

    if (!title && !content) {
      return res.status(400).json({ message: "No fields to update provided" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    displayError(error, res);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    if (!noteId) {
      return res.status(400).json({ message: "Note ID is required" });
    }
    const deletedNote = await Note.findByIdAndDelete(noteId, { new: true });
    if (!deletedNote) {
      return res.status(404).json({ message: `Note not found` });
    }
    res.status(200).json(`Note with id ${noteId} has been deleted`);
  } catch (error) {
    displayError(error, res);
  }
};

export const getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;
    if (!noteId) {
      return res.status(400).json({ message: "Note ID is required" });
    }
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: `Note not found` });
    }
    return res.status(200).json(note);
  } catch (error) {
    displayError(error, res);
  }
};

function displayError(error, res) {
  res.status(500).json({ message: `Internal server error` });
  console.log(error);
}
