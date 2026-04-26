const blacklistModel = require("../models/blacklist.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).josn({
      message: "token not provided",
    });
  }

  const isBlackListToken = await blacklistModel.findOne({
    token,
  });

  if (isBlackListToken) {
    return res.status(401).json({
      message: "Inavlid token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}


module.exports = {
  authUser,
};
