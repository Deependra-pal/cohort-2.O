 const bcrypt = require("bcrypt");
 const userModel = require("../models/user.model");
 const jwt = require("jsonwebtoken");
 
 
 
 
 
 async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  const isUserAlreadyExit = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExit) {
    if (isUserAlreadyExit.username === username) {
      return res.status(409).json({
        message: "username already exits",
      });
    }
     if (isUserAlreadyExit.email === email) {
      return res.status(409).json({
        message: "email already exits",
      });
    }

  }

  const hashPassword = await bcrypt.hash(password,10);

  const user  = await userModel.create({
    username,
    email,
    password : hashPassword,
    bio,
    profileImage 
  })
    
  const token = jwt.sign({Id : user._id,username : user.username},process.env.JWT_SECRET_KEY,{expiresIn:"1d"});

  res.cookie("token",token)

  res.status(201).json({
    message : "user register sucessfully",
    user : {
        username : user.username,
        email : user.email,
        bio : user.bio,
        profileImage : user.profileImage

    }
  })
}

async function loginController(req,res) {
       const {username,password,email} = req.body

       const user = await userModel.findOne({
           $or : [{email},{username}]
       });

       if(!user){
        return res.status(400).json({
          message : "user not found"
        })
       }
  
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if(!isPasswordValid){
        return res.status(401).json({
          message : "Invalid Password"
        })
      }

    const token = jwt.sign({Id : user._id , username : user.username},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})

    res.cookie("token",token)

       res.status(200).json({
        message: "user LoggedIn Sucessfully",
        user : {
          username : user.username,
          email : user.email,
          bio : user.bio,
          profileImage : user.profileImage
        }
       })
        
       

       

}



module.exports = {
    registerController,
    loginController
}