const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true, "username is required"],
        unique:[true , "username already exits "]
    },
    email:{
        type:String,
        require:[true,"Email is required"],
        unique: [true, "Email already exits"]
    },
    password:{
        type:String,
        require:[true, "password is required"],
    },
    bio:String,
    profileImage : {
           type: String,
           deafult :"https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"
    }
})


const userModel = mongoose.model('user',userSchema)


 module.exports = userModel