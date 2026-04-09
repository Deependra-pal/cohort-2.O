const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return res.status(401).json({
      message: "user not authorized",
    });
  }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    img_url: file.url,
    user: decoded.Id,
  });

  res.status(201).json({
    message: "Post create sucessfully",
    post,
  });
}

async function getPostController(req, res) {
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

  const userId = decoded.id;

  console.log(decoded);

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "post fetch sucessfully",
    posts,
  });
}


async function getPostDeatilsController(req,res) {

  const token = req.cookies.token 

  if(!token){
    return res.status(401).json({
      message : "UnAuthorized Acess"
    })
  }

  let decoded = null

  try{
       decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
  }catch(err){
    return res.status(401).json({
      message : "invalid token"
    })
  }

  const userId = decoded.id
  const postId = req.params.postId

  const post = await postModel.findById(postId)


  if(!post){
    return res.status(404).json({
        message : "Post not found "
    })
  }

  const isvaliduser = post.user === userId 



  if(!isvaliduser){
    return res.status(403).json({
      message : "Forbidden Content."
    })
  }

  return res.status(200).json({
    message : "Post fetch ssucessfully",
    post
  })
}





module.exports = {
  createPostController,
  getPostController,
  getPostDeatilsController
};
