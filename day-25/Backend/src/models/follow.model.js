const { default: mongoose } = require("mongoose");
const mogngoose = require("mongoose");

const follewSchema = new mogngoose.Schema(
  {
    follower: {
      type: String
    },
    followee: {
     type: String
    },
  },
  {
    timestamps: true,
  },
);

follewSchema.index({ follower: 1 }, { followee: 1 }, { unique: true });

const followModel = mongoose.model("follow", follewSchema);

module.exports = followModel;
