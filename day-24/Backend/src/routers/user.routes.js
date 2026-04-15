const express = require("express")

const userRouter = express.Router()

const userIdenty = require("../middlewares/auth.middleware")

const followController = require("../controllers/user.controller")

// @routes - POST/api/user/follow/:userid
// @description - follow a user
// @access - Private

userRouter.post("/follow/:username" , userIdenty,followController.followUserController )

// @routes - POST/api/user/follow/:userid
// @description - unfollow a user
// @access - Private

userRouter.post("/unfollow/:username" , userIdenty, followController.unfollowUserController)








module.exports = userRouter