const mongoose = require('mongoose')



const notesModel =  mongoose.Schema({
    title:String,
    description:String
})

const noteModel = mongoose.model("notes",notesModel);


module.exports = noteModel  