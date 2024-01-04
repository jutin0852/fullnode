import { useEffect, useState } from "react";
import Note from "./note";
import noteServices from "./services/note";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteServices.create(noteObject).then((returnedNotes) => {
      setNotes(notes.concat(returnedNotes));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const newNote = { ...note, important: !note.important };
    noteServices
      .update(id, newNote)
      .then((returnedNotes) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNotes)));
      })
      .catch((err) => {
        alert(`the note ${note.content} has been deleted from the server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  useEffect(() => {
   
    noteServices.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default App;
