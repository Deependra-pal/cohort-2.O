const express = require("express")
const postRouter = express.Router()
const userIdentify = require("../middlewares/auth.middleware")

const postController = require("../controllers/post.controller")

const multer = require("multer");
const upload = multer({Storage : multer.memoryStorage()})




postRouter.post("/",upload.single("image") ,userIdentify, postController.createPostController)

postRouter.get("/", userIdentify , postController.getPostController)

// get/api/post/details/:postId , also check weather the post belong to the user that  the request comr from

postRouter.get("/details/:postId", userIdentify , postController.getPostDeatilsController)
 


module.exports = postRouter