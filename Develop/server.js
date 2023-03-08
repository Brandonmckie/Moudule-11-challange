const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const uuid = require("uuid");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// API ROUTES
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.post("/api/notes", (req, res) => {
  const note = JSON.parse(fs.readFileSync("./db/db.json"));
  const newNote = req.body;
  newNote.id = uuid.v4();
  note.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(note));
  res.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
  const note = JSON.parse(fs.readFileSync("./db/db.json"));
  const deleteNote = note.filter((delNote) => delNote.id !== req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
  res.json(deleteNote);
});

// HTML ROUTES
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Listen to port
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
