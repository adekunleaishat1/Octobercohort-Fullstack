const express = require("express")
const app = express()
require("dotenv").config()
const connect = require("./config/dbConfig")
const userrouter = require("./routes/userroute")
const cors = require("cors")
const ErrorHandler = require("./middleware/Errorhandler")
const socket = require("socket.io")
const chatmodel = require("./models/chatmodel")
app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/user", userrouter)



connect(process.env.MONGO_URI)
app.use(ErrorHandler)

const port = 5002

const connection = app.listen(port,()=>{
    console.log(`app stared at port ${port}`);
})

const io = socket(connection,{
    cors:{origin:"*"}
})

io.on("connection", async(socket)=>{
     const allchat = await chatmodel.find()
    console.log("A user Connected");
  socket.on("sendmessage", async(chat)=>{
   console.log(chat)
   const {sender, message} = chat
     const sentchat =  await chatmodel.create({message,sender})
     if (sentchat) {
      console.log("chat saved successfully");
      
     }
    socket.emit("Receivemessage", chat)
  })

 socket.emit("savedchat",allchat)
  
    
})