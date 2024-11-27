
 const usermodel = require("../models/usermodel")
 const bcrypt = require("bcryptjs")
 const jwt = require("jsonwebtoken")
 const {Verifytoken} = require("../session/sessionservice")
 const cloudinary = require("../middleware/cloudinary") 
 const {sendmail } = require("../middleware/mailer")
 
const userSignup = async(req, res) =>{
  try {
    console.log(req.body);
    const {firstname, lastname, email, password} = req.body
    if (!firstname || !lastname || !email || !password) {
     return  res.status(400).send({message:"All fields are mandatory", status:false}) 
    }else{
     const hashpassword = await bcrypt.hash(password, 10)
     const saveduser = await usermodel.create({
      firstname,
      lastname,
      email,
      password:hashpassword
     })
     if (saveduser) {
        await  sendmail(firstname, email)
       return res.status(200).send({message:"Signup successful", status:true})   
     }
    }
  } catch (error) {
    console.log(error);
    
    if (error.message.includes("E11000 duplicate key error collection")) {
      return  res.status(407).send({message:"Already a registered user", status:false}) 
    }
   return res.status(500).send({message:error.message, status:false}) 
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
        const token =  await jwt.sign({email}, "SecretKey", {expiresIn:'1d'})
        res.status(200).send({message:"Login successful", status:true, token,existuser})
       }
    }

   } catch (error) {
    res.status(500).send({message:error.message, status:false})
   }
}


const VerifyToken = async(req, res, next) =>{
  try {
    const token  = req.headers.authorization.split(" ")[1]
     if (!token) {
      res.status(401).send({message:"token is required ", status:false})
     }else{
        const email = await Verifytoken(token)
        
         
      if (email) {
        res.status(200).send({message:"token verification successful", status:true})
      }
     }
  } catch (error) {
    console.log(error.name);
    
   next(error)
  }
}


const UploadProfile = async (req, res, next) =>{
try {
  const {image } = req.body
  console.log(image);
  console.log(req.headers.authorization);
  
  const token = req.headers.authorization.split(" ")[1]
  const email = await Verifytoken(token)
  console.log(email,"user");
  if (!email) {
    res.status(402).send({message:"token verification failed", status:false})
  }
   const imageupload = await cloudinary.uploader.upload(image)

   const profileupdate =   await usermodel.findOneAndUpdate(
      {email},
      {$set:{Profileimage:imageupload.secure_url}},
      {new:true}
    )
    console.log(profileupdate);
    
   if (profileupdate) {
    res.status(200).send({message:"Profile Uploaded", status:true})
   }else{
    res.status(405).send({message:"unable to upload profile", status:false})
   }
} catch (error) {
  console.log(error);
  
  next(error)
}
}



module.exports = {userSignup, userLogin, VerifyToken, UploadProfile}