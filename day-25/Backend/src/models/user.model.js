const  mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
    username : {
        type: String,
        unique : [true , "username already Exits"],
        require : [true , " username is require " ]
    },
    email : {
        type: String,
        unique : [true , "Email already Exits"],
        require : [true , "Email is require"] 

    },
    password : {
        type: String,
        require : [true , "password is require" ],
        select : false
    },
    bio : String,
    profileImage : {
         type : String,
         default : "https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"
    }
})



const userModel = mongoose.model('user',userSchema);

module.exports = userModel