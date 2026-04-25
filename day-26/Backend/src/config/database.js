const mongoose = require("mongoose");

function connectToDB() {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connect TO Db");
    })
    .catch((err) => {
      console.log("Err connect To DB ", err);
    });
}

module.exports = connectToDB;
