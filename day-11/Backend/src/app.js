const express = require("express");
const noteModel = require("./Models/notesModel");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

// Post /api/notes
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const notes = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note Create sucessfully",
    notes,
  });
});

//GET/api/notes

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "fetch Notes sucessfully",
    notes,
  });
});

//Delete/api/notes

app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;

  const note = await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note delete sucessfully",
    note,
  });
});

app.put("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const note = await noteModel.findByIdAndUpdate(id, {
    title,
    description,
  });

  res.status(200).json({
    message: "Note update Sucessfully",
    note,
  });
});

module.exports = app;
