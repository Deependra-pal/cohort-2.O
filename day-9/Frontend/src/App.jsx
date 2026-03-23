import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [note, setNote] = useState([]);

  const getData = async () => {
    const response = await axios.get("http://localhost:7000/api/notes");
    const { data } = await response;
    setNote(data.notes);
  };

  useEffect(() => {
    getData();
  }, []);

 

   

  return (
    <div className="notes">
      {note.map((e) => {
        return (
          <div className="note">
            <h1>{e.title}</h1>
            <p>{e.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
