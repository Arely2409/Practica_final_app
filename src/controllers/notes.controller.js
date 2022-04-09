import Note from "../models/Note";

export const renderNoteForm = (req, res) => {
  res.render("notes/new-note");
};

export const createNewNote = async (req, res) => {
  const { title, description, data } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Compi escribe un título" });
  }
  if (!description) {
    errors.push({ text: "Compi escribe una descripción" });
  }
  if (!data) {
    errors.push({ text: "Compi escribe fecha" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description,
      data,
    });
  } else {
    const newNote = new Note({ title, description, data });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash("success_msg", "Tarea agregada con éxito");
    res.redirect("/notes");
  }
};

export const renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("notes/all-notes", { notes });
};

export const renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash("error_msg", "No autorizado :(");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note });
};

export const updateNote = async (req, res) => {
  const { title, description, data } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description, data });
  req.flash("success_msg", "Tarea actualizada");
  res.redirect("/notes");
};

export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Tarea eliminada");
  res.redirect("/notes");
};
