
 const usermodel = require("../models/usermodel")
 const bcrypt = require("bcryptjs")
 
const userSignup = async(req, res) =>{
  try {
    console.log(req.body);
    const {firstname, lastname, email, password} = req.body
    if (!firstname || !lastname || !email || !password) {
       res.status(400).send({message:"All fields are mandatory", status:false}) 
    }else{
     const hashpassword = await bcrypt.hash(password, 10)
     const saveduser = await usermodel.create({
      firstname,
      lastname,
      email,
      password:hashpassword
     })
     if (saveduser) {
        res.status(200).send({message:"Signup successful", status:true})   
     }
    }
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
        res.status(407).send({message:"Already a registered user", status:false}) 
    }
    res.status(500).send({message:error.message, status:false}) 
  }
}


const userLogin = async (req , res) =>{
   try {
    const { email, password} = req.body
    const existuser =  await usermodel.findOne({email:email})
    
    if (!existuser) {
      res.status(405).send({message:"Not a registered user ; Please signup", status:false})
    } else {
      const correctpassword =  await bcrypt.compare(password, existuser.password)
      console.log(correctpassword);
       if (!correctpassword) {
        res.status(405).send({message:"Incorrect password", status:false})
       }else{
        res.status(200).send({message:"Login successful", status:true})
       }
      
    }

   } catch (error) {
    res.status(500).send({message:error.message, status:false})
   }
}




module.exports = {userSignup, userLogin}