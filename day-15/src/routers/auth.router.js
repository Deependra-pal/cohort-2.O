const express = require("express");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
 

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { username, email, bio, profileImage, password } = req.body;

  const isUserAlreadyExits = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExits) {
    res.status(409).json({
      message:
        "User already exits" + isUserAlreadyExits === username
          ? "User already Exits"
          : "Email already Exits",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);


  res.status(200).json({
     message : "user register Sucessfully",
     username : user.username,
     email: user.email
  })
});

 




module.exports = authRouter;
