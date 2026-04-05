 const mongoose  = require('mongoose');

const postSchema = mongoose.Schema({
    caption : {
        type : String,
        default : ""
    },
    img_url : {
        type : String,
        require : [true , "Img_url is required for creating post"]
    },
    user:{
             ref:"user",
             type : mongoose.Schema.Types.ObjectId,
             require : [true , "user id is required for created a post"]

    }
})


const postModel = mongoose.model("posts", postSchema);


 module.exports = postModel