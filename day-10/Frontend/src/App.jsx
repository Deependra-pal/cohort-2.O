import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // 🔹 Fetch Notes
  const fetchNotesData = async () => {
    const response = await axios.get("http://localhost:8000/api/notes");
    setNotes(response.data.notes);
  };

  useEffect(() => {
    fetchNotesData();
  }, []);

  // 🔹 Form Handling (CREATE + UPDATE)
  const formHandling = (e) => {
    e.preventDefault();

    const { title, description } = e.target.elements;

    if (isEditing) {
      // 🔥 UPDATE
      axios.put(`http://localhost:8000/api/notes/${currentNote._id}`, {
          title: title.value,
          description: description.value,
        })
        .then((res) => {
          console.log(res.data);
          fetchNotesData();
          setIsEditing(false);
          setCurrentNote(null);
        });
    } else {
      //  CREATE
      axios
        .post("http://localhost:8000/api/notes", {
          title: title.value,
          description: description.value,
        })
        .then((res) => {
          console.log(res.data);
          fetchNotesData();
        });
    }
  };

  //  Delete Note
  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:8000/api/notes/${id}`);
    fetchNotesData();
  };

  //  Edit Note
  const updateNotes = (id) => {
    const note = notes.find((n) => n._id === id);
    setCurrentNote(note);
    setIsEditing(true);
  };

  return (
    <div className="notes">
      <div className="create-note">
        <form onSubmit={formHandling}>
          <input
            name="title"
            type="text"
            placeholder="title"
            value={currentNote?.title || ""}
            onChange={(e) =>
              setCurrentNote({ ...currentNote, title: e.target.value })
            }
          />

          <input
            name="description"
            type="text"
            placeholder="description"
            value={currentNote?.description || ""}
            onChange={(e) =>
              setCurrentNote({
                ...currentNote,
                description: e.target.value,
              })
            }
          />

          <button>{isEditing ? "Update Note" : "Create Note"}</button>
        </form>
      </div>

      {notes.map((note) => (
        <div className="note" key={note._id}>
          <h1>{note.title}</h1>
          <p>{note.description}</p>

          <div className="buttons">
            <button onClick={() => deleteNote(note._id)}>Delete</button>
            <button onClick={() => updateNotes(note._id)}>Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
