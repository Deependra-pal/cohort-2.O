const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const JWT = require("jsonwebtoken");
const crypto = require('crypto'); 

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashPassword =  crypto.createHash('md5').update(password).digest('hex')

  const isUserAlreadyExits = await userModel.findOne({ email });

  if (isUserAlreadyExits) {
    return res.status(409).json({
      message: "user already  exits with this email address",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password:hashPassword,
  });

  const token = JWT.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("JWT_token", token);

  res.status(201).json({
    message: "user register sucessfully",
    user,
    token,
  });
});

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);
});


authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;



  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found with this email address",
    });
  }

  const isPasswordMatch = user.password === crypto.createHash('md5').update(password).digest("hex")

  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User logged in",
    user,
    token,
  });
});

module.exports = authRouter;
