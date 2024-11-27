const express = require("express")
const {userSignup, userLogin, VerifyToken, UploadProfile} = require("../controllers/userController")
const {Validate} = require("../middleware/Validation")
const {userValidation} = require("../middleware/userValidation")
const userrouter = express.Router()


userrouter.post("/signup", Validate(userValidation), userSignup)
userrouter.post("/login", userLogin)
userrouter.get("/verify", VerifyToken)
userrouter.post("/upload", UploadProfile)


module.exports = userrouter