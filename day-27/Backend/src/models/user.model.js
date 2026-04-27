const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Username is require "],
    unique: [true, "Username must be unique"],
  },
  email: {
    type: String,
    require: [true, "email is require "],
    unique: [true, "email must be unique"],
  },
  password: {
    type: String,
    require: [true, "password is require "],
    select : false
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
