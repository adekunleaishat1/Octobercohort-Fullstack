const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userschema = new mongoose.Schema({
    firstname:{type:String,trim:true,required:true},
    lastname:{type:String,trim:true, required:true},
    email:{type:String,unique:true, trim:true, required:true},
    password:{type:String,trim:true, required:true},
    Profileimage:{type:String, trim:true}
})

// const saltRound = 10

// userschema.pre("save", function (next) {
//     bcrypt.hash(this.password, saltRound).then((hashpassword)=>{
//         console.log(hashpassword);
//         this.password = hashpassword
//         next()
        
//     }).catch((err)=>{
//         console.log(err);
        
//     })
    
// })


const usermodel = mongoose.model("user_collections", userschema)


module.exports = usermodel