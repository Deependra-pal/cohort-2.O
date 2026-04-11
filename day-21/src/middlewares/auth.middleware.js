const jwt = require("jsonwebtoken");

async function userIdentify(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token invalid ",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }

  req.user = decoded;
  console.log(req.user);

  next();
}

module.exports = userIdentify;
