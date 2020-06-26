//Dependencies ===============================
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require ("./db.json")


//Express===============================
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Routes===============================

//READ files in db.json ===========================================

app.get("/api/notes", (req, res) => { 
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) {
      return console.log("Error: "+err);
    }
    //console.log("data: "+data);
    res.json(JSON.parse(data));
  })
});

//POST a new note to db.json ===========================================

app.post("/api/notes", (req, res) => {
  const newID = Math.floor((Math.random() * 100) + 1);

  const newNote = {
    id: newID,
    title: req.body.title,
    text: req.body.text
  };

  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) {
      console.log("Error: "+err);
    }
    const allNotes = JSON.parse(data);
    //console.log("allnotes"+allNotes)
    allNotes.push(newNote);
    //console.log("notes: "+ JSON.stringify(allNotes));

    fs.writeFile("./db.json", JSON.stringify(allNotes, null, 2), (err) => {
      if (err){
        console.log("Error: "+err);
      } else{
        res.json(allNotes);
        console.log("New Note Saved!");

      }
    });
  });
});


//DELETE files in db.json ===========================================

app.delete("/api/notes/:id", (req, res) =>{
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) {
      return console.log("Error: "+err);
    } 
      const findNotes = JSON.parse(data)
      console.log('reached else statement ')

      findNotes.forEach(el => {
        console.log('el ID: '+el.id)
        console.log("req ID: "+req.params.id);
        if (el.id == req.params.id){
          findNotes.splice(el, 1);
          console.log('spliced the element!')
        }
        console.log("nothing to delete!")
      });
  
      fs.writeFile("./db.json", JSON.stringify(findNotes, null, 2), (err) => {
        if (err){
          console.log("Error: "+err);
        }
          res.json(db);
          console.log("Note Deleted!");
      })
  })
});

//gets html files===============================

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

  //Start Server ===============================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  