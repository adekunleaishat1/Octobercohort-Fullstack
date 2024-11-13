const express = require("express")
const app = express()
require("dotenv").config()
const connect = require("./config/dbConfig")
const userrouter = require("./routes/userroute")
const cors = require("cors")
const ErrorHandler = require("./middleware/Errorhandler")

app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/user", userrouter)



connect(process.env.MONGO_URI)
app.use(ErrorHandler)

const port = 5002

app.listen(port,()=>{
    console.log(`app stared at port ${port}`);
})