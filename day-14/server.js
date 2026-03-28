require('dotenv').config()
const app = require('./src/app');
const connectToDB = require('./src/config/database');
 


connectToDB()





app.listen(8000,()=>{
    console.log("server is runing on port 8000");
})

