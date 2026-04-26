const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");

async function registerController(req, res) {
  const { username, email, password } = req.body;

  // check if user exists
  const userAlreadyExits = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userAlreadyExits) {
    if (userAlreadyExits.username == username) {
      return res.status(400).json({
        message: "username Already Exits",
        userAlreadyExits,
      });
    } else if (userAlreadyExits.email === email) {
      return res.status(400).json({
        message: "email Already Exits",
        userAlreadyExits,
      });
    }
  }

  // hash password
  const hashPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
  });

  // generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  // set cookie
  res.cookie("token", token);

  res.status(201).json({
    message: "user register sucessfully",
    user,
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  //   find user
  const user = await userModel
    .findOne({
      $or: [{ username }, { email }],
    })
    .select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  //   compare the password
  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  // create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  // set token

  res.cookie("token", token);

  //   response

  res.status(200).json({
    message: "user login sucessfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function getMeController(req, res) {
  const id = req.user;
  console.log(id);

  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "user fetch sucessfully",
    user,
  });
}

async function logoutUser(req, res) {

  const token = req.cookies.token; 

  res.clearCookie("token");

  await blacklistModel.create({
    token
  });

  res.status(200).json({
    message: "logout sucessfully.",
  });
}


module.exports = {
  registerController,
  loginController,
  getMeController,
  logoutUser
};
