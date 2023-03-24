const express = require("express");
const path = require("path");

const notes = require("./db/db.json");

const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//GET * from the index throguh html routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//get notes from HTML routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

//get api/notes from api routes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

//post /api/notes
app.post("/api/notes", (req, res) => {
  let newNote = {
    title: req.body.title,
    text: req.body.text,
  };

  notes.push(newNote);
  fs.writeFile(
    path.join(__dirname, "db", "db.json"),
    JSON.stringify(notes),
    (err) => {
      if (err) {
        console.log(err);
      }
      res.json(newNote)
    }
  );
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
