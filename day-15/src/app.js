const express = require('express')
const authRouter = require('./routers/auth.router');
const cookieParser = require("cookie-parser");
 


const app = express()

app.use(cookieParser())
app.use(express.json())
app.use('/api/auth' , authRouter);
 
 
 

module.exports = app