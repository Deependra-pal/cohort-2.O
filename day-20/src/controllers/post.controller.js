const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    img_url: file.url,
    user: req.user.Id,
  });

  res.status(201).json({
    message: "Post create sucessfully",
    post,
  });
}

async function getPostController(req, res) {
  const userId = req.user.Id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "post fetch sucessfully",
    posts,
  });
}

async function getPostDeatilsController(req, res) {
  const userId = req.user.Id;
   

  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found ",
    });
  }

  const isvaliduser = post.user.toString( ) === userId;

  if (!isvaliduser) {
    return res.status(403).json({
      message: "Forbidden Content.",
    });
  }

  return res.status(200).json({
    message: "Post fetch ssucessfully",
    post,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDeatilsController,
};
