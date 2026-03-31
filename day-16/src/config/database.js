const mongoose = require('mongoose');

 async function connectToDB(){
   await mongoose.connect(process.env.MONGO_URI);

   console.log("conntect To  DB");
   
 }



 module.exports = connectToDB