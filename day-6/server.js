// server ko start krna 
// database se connect krna 


const app = require('./src/app');

const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect('mongodb+srv://deependra:Q4CbsmtSq22QmCdh@cluster0.q71n8mv.mongodb.net/day-6')
    .then(()=>{
        console.log("Connected to database");
    })
}
connectToDb();





app.listen(3000,()=>{
    console.log("server is runing on port 3000");
    
})