const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");




authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userAreadyExits = await userModel.findOne({ email });

  if (userAreadyExits) {
    return res.status(409).json({
      message: "user already exits",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_token, {
    expiresIn: "1h",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "user register sucessfully",
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
})

authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.token;

  const decode = jwt.verify(token, process.env.JWT_token);
  console.log(decode.id);

  const user = await userModel.findById(decode.id);

  res.status(200).json({
    name: user.name,
    email: user.email,
  });
})

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user =  await userModel.findOne( {email} );

  if(!user){
    return res.status(401).json({
          message : "Invalid email"
    })
  }

  const hash = crypto.createHash('sha256').update(password).digest("hex")
  const ishashPassword = hash === user.password

  if(!ishashPassword){
    return res.status(400).json({
        message : "Invalid Password"
    })
  }
  

  const token = jwt.sign({id : user._id},process.env.JWT_token,{expiresIn:"1h"})

  res.cookie("NewToken" , token)


  res.status(200).json({
    message : "Login sucessful",
    user : user.name,
    email : user.email
  })
    

 



  
})


module.exports = authRouter;
