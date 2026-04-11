const express = require("express")
const postRouter = express.Router()

const userIdentify = require("../middlewares/auth.middleware")

const postController = require("../controllers/post.controller")

const multer = require("multer");
const { routes } = require("../app");
const upload = multer({Storage : multer.memoryStorage()})


// @routes - POST/api/posts/ [protected]
// @description - create a post with image and text  , also check weather the post belong to the user that  the request comr from 
 
postRouter.post("/",upload.single("image") ,userIdentify, postController.createPostController)


// @routes - POST/api/posts/ [protected]
// @description - get all post of the user that  the request comr from

postRouter.get("/", userIdentify , postController.getPostController)

// @routes - GET/api/posts/details/:postId [protected] 
// @description - get post details with all comments and likes

postRouter.get("/details/:postId", userIdentify , postController.getPostDeatilsController)


// @routes - POST/api/posts/like/:postId
// description - like a post
 
 postRouter.post("/like/:postid" , userIdentify , postController.likePostController)

module.exports = postRouter 