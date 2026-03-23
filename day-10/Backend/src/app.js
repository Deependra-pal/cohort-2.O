const express = require("express");
const noteModel = require("./models/notes.model");
const cors = require("cors");
require("path");

const app = express();
app.use(express.json());
app.use(cors());

//POST/api/notes/
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "note Create sucessfully",
    note,
  });
});

// GET/api/notes
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Fetch Notes sucessfully",
    notes,
  });
});

// DETELET / api/notes
app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;

  const note = await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "note delete Sucessfully",
    note,
  });
});

// Patch/api/notes/:id

app.put("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const note = await noteModel.findByIdAndUpdate(id, {
    title,
    description,
  });

  res.status(200).json({
    message: "note  Update sucessfully ",
    note,
  });
});

module.exports = app;
