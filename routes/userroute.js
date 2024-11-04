const express = require("express")
const {userSignup, userLogin} = require("../controllers/userController")
const userrouter = express.Router()


userrouter.post("/signup", userSignup)
userrouter.post("/login", userLogin)


module.exports = userrouter