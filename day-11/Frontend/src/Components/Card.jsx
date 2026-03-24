import React from "react";
import axios from 'axios'




 

const Card = ({deleteNote,note,editNote}) => {
 
  
   
  
  
 
  
  
  
  return (
     
     <div className="notes-box">
       <div className="note">
        <h2>{note.title}</h2>
        <p>{note.description}</p>
        <div className="btns">
          
          <button onClick={ ()=>{
            editNote(note._id)
          }}>Edit</button>

          <button onClick={()=>{
            deleteNote(note._id)
          }}>delete</button>

        </div>
      </div>
     </div> 
     
  );
};

export default Card;
