const express = require("express")
const {userSignup, userLogin, VerifyToken, UploadProfile} = require("../controllers/userController")
const userrouter = express.Router()


userrouter.post("/signup", userSignup)
userrouter.post("/login", userLogin)
userrouter.get("/verify", VerifyToken)
userrouter.post("/upload", UploadProfile)


module.exports = userrouter