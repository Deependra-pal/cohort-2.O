const  express = require('express');
const cookieParser = require('cookie-parser')
const authRouter = require('./router/auth.router')
 

const app = express()


app.use(cookieParser())
app.use(express.json())
app.use('/api/auth' , authRouter)




module.exports = app;