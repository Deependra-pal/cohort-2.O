const express = require("express");
const authRouter = express.Router();
const identifyUser = require("../middlewares/auth.middleware")

const authController = require("../controllers/auth.controller")
 
 
// POST /api/register
authRouter.post("/register", authController.registerController );


// POST /api/login
authRouter.post("/login" ,  authController.loginController)

// GET /api/get-me

authRouter.get("/get-me" , identifyUser , authController.getMeController )

module.exports = authRouter;
