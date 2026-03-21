const express = require('express')
const noteModel = require('./models/notes.model');


const app = express()

app.use(express.json())


//  POST/api/notes
//  this api send data  to  server and server to add data in DB.

app.post('/api/notes' , async (req,res) => {
    const {title , description} = req.body;

    // dataBase mein store code
    
   const note = await noteModel.create({
        title , description
    })
     

    res.status(201).json({
        message:"note create sucessfully",
        note
    })
    

    
})

//  GET/api/notes 
// fetch all the notes from nongoDb and send them in the response 

app.get('/api/notes' , async (req,res)=>{

   const note = await noteModel.find()

   res.status(200).json({
       message: "fetch notes sucessfully",
       note
   })
})

//  DELETE/api/notes/:id
// delete note with id from req.params

app.delete('/api/notes/:id', async (req,res)=>{
        const {id} = req.params
       
       const note  = await noteModel.findByIdAndDelete(id)
        
       

      res.status(200).json({
        message: "notes delete sucessfully",
        note
      })
      
})

// PATCH /api/notes:id
//  update the description or the nots by id 

app.patch('/api/notes/:id', async (req,res)=>{
    const {id} = req.params;
    const {description } = req.body;

    const note = await noteModel.findByIdAndUpdate(id , {description})

    res.status(200).json({
        message : "note Update secessfully",
        note
    })

    
})


 









module.exports = app

