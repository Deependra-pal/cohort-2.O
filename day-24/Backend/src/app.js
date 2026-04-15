const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")





const app  = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))


// require Routers

const authRouter = require("./routers/auth.routes")
const postRouter = require("./routers/post.routes")
const userRouter = require("./routers/user.routes")


//  using routes 

app.use("/api/auth" , authRouter )
app.use("/api/posts", postRouter ) 
app.use("/api/users" , userRouter)



module.exports = app

