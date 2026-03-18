const express = require("express")


const app = express();

app.use(express.json());

const notes = []

// POST/notes 
app.post('/notes',(req,res)=>{

    console.log(req.body);

    notes.push(req.body)

     res.status(201).json({
        "message" : "Note created sucessfully"
     })
    
})

// GET / notes 
app.get('/notes',(req,res)=>{

    res.status(200).json({
        notes : notes

    });
})

// DELETE / notes 

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]

    res.status(204).json({
        message : "Note deleted sucessfully"
    })

})

//  PATCH /notes

app.patch('/notes/:index',(req,res)=>{r
    notes[req.params.index].description = req.body.description;

    res.status(200).json({
        message : "notes updated secessfully"
    })
})


module.exports = app



