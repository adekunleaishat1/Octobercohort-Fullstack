
const mongoose = require("mongoose")

const chatschema = mongoose.Schema({
    message:{type:String,required:true,trim:true},
    sender:{type:String, required:true, trim:true}
},{timestamps:true})


const chatmodel = mongoose.model("chat_collection", chatschema)

module.exports = chatmodel