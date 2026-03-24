import Card from "./Components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch notes
  const fetchNotes = async () => {
    const response = await axios.get("http://localhost:8000/api/notes");
    const { data } = await response;
    setNotes(data.notes);
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  // delete notes
  const deleteNote = (id) => {
    console.log(id);
    axios.delete(`http://localhost:8000/api/notes/${id}`).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  };

  // from Handling
  const formHandling = (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;

    if (isEditing) {
      axios
        .put(`http://localhost:8000/api/notes/${currentNote._id}`, {
          title: title.value,
          description: description.value,
        })
        .then((res) => {
          console.log(res.data);
          fetchNotes();
          setIsEditing(false);
          setCurrentNote(null);
        });
    } else {
      axios
        .post("http://localhost:8000/api/notes", {
          title: title.value,
          description: description.value,
        })
        .then((res) => {
          res.data;
          fetchNotes();
        });
    }
  };

  const editNote = (id) => {
    const note = notes.find((n) => n._id === id);
    setCurrentNote(note);
    setIsEditing(true);
  };

  return (
    <div className="main">
      <form className="create-note" onSubmit={formHandling}>
        <input
          name="title"
          type="text"
          placeholder="Enter title"
          value={currentNote?.title || ""}
          onChange={(e) => {
            setCurrentNote({ ...currentNote, title: e.target.value });
          }}
        />
        <input
          name="description"
          type="text"
          placeholder="Enter description"
          value={currentNote?.description || ""}
          onChange={(e) => {
            setCurrentNote({ ...currentNote, description: e.target.value });
          }}
        />

        <button>{isEditing ? "Update Note" : "Create Note"}</button>
      </form>
      {notes.map((elem) => {
        return <Card note={elem} deleteNote={deleteNote} editNote={editNote} />;
      })}
    </div>
  );
};

export default App;
