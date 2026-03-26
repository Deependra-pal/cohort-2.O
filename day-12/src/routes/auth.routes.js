const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const JWT = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExits = await userModel.findOne({ email });

  if (isUserAlreadyExits) {
    return res.status(400).json({
      message: "user already  exits with this email address",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password,
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

module.exports = authRouter;
