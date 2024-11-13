const jwt = require("jsonwebtoken")
const secretkey = "SecretKey"

const Verifytoken = async(token) =>{
   try {
    if (!token) {
       throw new Error({name:"Authentication error", message:"Invalid token"}) 
    }
    const decodedtoken = await jwt.verify(token,secretkey)
    const email = decodedtoken.email
    return email
   } catch (error) {
    if (error.name == "TokenExpiredError") {
       throw new Error("Token expired") 
    }
    throw new Error("error verifing voken") 
   }
}

module.exports = {Verifytoken}