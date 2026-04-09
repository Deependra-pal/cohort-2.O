const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  const isUserAlreadyExits = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExits) {
    if (isUserAlreadyExits.username === username) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    if (isUserAlreadyExits.email === email) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "user register sucessfully",
    user : {
        username : user.username,
        email : user.email,
        bio : user.bio,
    }
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExits = await userModel.findOne({
    $or: [{ username }, { email }],
  });

   if (isUserAlreadyExits) {
    if (isUserAlreadyExits.username === username) {
      return res.status(409).json({
        message: "username not found",
      });
    }

    if (isUserAlreadyExits.email === email) {
      return res.status(409).json({
        message: "email not found",
      });
    }
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const isPaswordValid = hash === user.password;

  if (!isPaswordValid) {
    return res.status(401).json({
      message: "Password Invalid",
    });
  }

  const token = jwt.sign({ Id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "user LoggedIn Sucessfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage
    },
  });
}



module.exports = {
  registerController,
  loginController,
};
