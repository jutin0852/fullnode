const express = require("express");
const app = express();
let notes = require("./data");
const cors = require("cors");

app.use(cors(),express.json());

const generateId = () => {
  const maxID = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  return maxID + 1;
};

app.get("/api/notes", (req, res) => {
  res.send(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((n) => n.id === Number(id));

  if (!note) {
    return res.status(404).send("this note doesnt exist");
  }
  res.send(note);
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  notes = notes.filter((n) => n.id !== Number(id));
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const body = req.body;
  const check = notes.find((n) => n.content === body.content);
  if (!body.content) {
    return res.status(400).send("include note");
  }
  if (check) {
    return res.status(400).send("note already exists");
  }
  const newNote = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };
  res.json(newNote);

  notes = notes.concat(newNote);
});

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`server is listening to port ${port} `);
});
