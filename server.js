//Dependencies
const express = require("express");
const path = require("path");


//Express
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const notes = []


//Routes

//gets html files
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

//makes api calls

// app.get("/api/notes", function(req, res) {
//   console.log(notes);
// });

// app.post("/api/notes", function(req, res) {
//   const newNote = req.body;
//   console.log(newNote);
//   notes.push(newNote);
//   res.json(newNote);
// });


//homepage




  //Start Server
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  