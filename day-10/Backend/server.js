const app = require('./src/app');
const connectToDb = require('./src/config/database');
require('dotenv').config()


connectToDb()


app.listen(8000,()=>{
    console.log("server is runig on port 8000")
})