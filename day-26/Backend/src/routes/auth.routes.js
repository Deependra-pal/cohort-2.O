const express = require("express")


 

const authController = require("../controllers/auth.Controller");
const authModdleware = require("../middlewares/auth.middleware")


const router = express.Router()

// API Routes 
// register 
router.post("/register" ,authController.registerController)

// Login 
router.post("/login" , authController.loginController)

// getUser details 
router.get("/get-me" , authModdleware.authUser , authController.getMeController)

// logout 


router.get("/logout" , authController.logoutUser)









module.exports = router