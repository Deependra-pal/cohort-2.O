const express = require("express")
const cookieParser = require("cookie-parser")



const app  = express()


app.use(express.json())
app.use(cookieParser())


// require Routers

const authRouter = require("./routers/auth.routes")
const postRouter = require("./routers/post.routes")
const userRouter = require("./routers/user.routes")


//  using routes 

app.use("/api/auth" , authRouter )
app.use("/api/posts", postRouter ) 
app.use("/api/users" , userRouter)



module.exports = app

