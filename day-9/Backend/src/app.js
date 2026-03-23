const express = require("express");
const noteModel = require("./models/notesModel");
const cors =  require('cors');
 

const app = express();
 

// middleWares
app.use(express.json());
app.use(cors())

// POST/api/notes
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
    mesaage: "Fetch data sucessfully",
    notes,
  });
});

//Delete/api/notes
app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;

  const notes = await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Delete Notes Sucessfully",
    notes,
  });
});

//PACTH/api/notes
app.patch("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  const notes = await noteModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    message: "Note Update Secessfully",
    notes,
  });
});



module.exports = app;
