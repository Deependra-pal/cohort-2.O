const express = require("express");
const authRouter = express.Router();

const registerController = require("../controllers/auth.controller")
 
 

authRouter.post("/register", registerController.registerController );
authRouter.post("/login" ,  registerController.loginController)

module.exports = authRouter;
