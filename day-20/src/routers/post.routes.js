const express = require("express")
const postRouter = express.Router()

const postController = require("../controllers/post.controller")

const multer = require("multer");
const upload = multer({Storage : multer.memoryStorage()})




postRouter.post("/",upload.single("image"), postController.createPostController)

postRouter.get("/",postController.getPostController)

// get/api/post/details/:postId , also check weather the post belong to the user that  the request comr from

postRouter.get("/details/:postId",postController.getPostDeatilsController)
 


module.exports = postRouter