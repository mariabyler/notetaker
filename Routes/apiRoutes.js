const fs = require("fs");
var notesData = getNotes();
function getNotes() {
  let data = fs.readFileSync('db/db.json');
  let notes = JSON.parse(data);
  for (let i = 0; i < notes.length; i++) {
      notes[i].id = '' + i;
  }
  return notes;
}
module.exports = function(app) {
 app.get("/api/notes", function(req, res){
  notesData = getNotes();
  res.json(notesData);
 });
 app.post("/api/notes", function(req, res) {
  let newId = notesData.length;
  Object.assign(req.body, {"id": newId.toString()});
  notesData.push(req.body);
  fs.writeFile('db/db.json', JSON.stringify(notesData), (error) => {
    if(error) throw error;
    console.log("file saved: ", notesData);
  });
  res.json(notesData);
});
app.delete("/api/notes/:id", function(req, res){
  console.log("delete this")
  const requestID = req.params.id;
  console.log("request id: ", requestID);
  notesData = notesData.filter(note => {
    return note.id !== requestID ? note : null ;
  });
  fs.writeFile('db/db.json', JSON.stringify(notesData), (error) => {
    if(error) throw error;
    console.log("file deleted: ", notesData);
  });
});
};