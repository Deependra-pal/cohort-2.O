// ess file ke main do kaam rahyeta hai
//  1.server create karna
//  2. server config karna :- matlab middle ware

const express = require("express");

const app = express(); /*  server create ho jata hai   */

app.use(
  express.json(),
); /* moddle ware use krna padta hai taki hm req,body ka data padh saka */

const notes = [
  // {
  //     title:"test  title 1",
  //     discription:" test discription 1"
  // }
];

//  POST data Create

app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);

  console.log(notes);

  res.send("notes create ");
});

//GET methos ka use :- server  size ko koi data retrives krna hota hai

app.get("/notes", (req, res) => {
  res.send(notes);
});

//  DELETE / notes

app.delete("/notes/:index", (req, res) => {
  // console.log(req.params.index);
  delete notes[req.params.index];

  res.send("notes delete sucessfully");
});

// PATCH
//  req.body = {discription :- "simple modified discription. "}

app.patch("/notes/:index", (req, res) => {
  console.log(req.params.index);

  notes[req.params.index].discription = req.body.discription;

  res.send(" Notes Update sucessfully ");
});

module.exports = app;
