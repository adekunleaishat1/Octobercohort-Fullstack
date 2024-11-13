const ErrorHandler = (error, req, res, next)=>{
   if (error.name == "MongoError") {
       if (error.code == 11000) {
        return res.status(400).send({message:" A value is already in use in our database", status:false})
       }
   }else if(error.name == "Authentication error"){
    return res.status(402).send({message:error.message || "Authentication error", status:false})
   }else if(error.message === "Token expired"){
    return res.status(402).send({message:"Token expired", status:false})
   }else if(error.name === "Authorization error"){
    return res.status(403).send({message: error.message ||"Authorization error", staus:"false"})
   }else if(error.name === "JsonWebTokenError"){
    return res.status(403).send({message: "Invalid User", staus:"false"})
   }
   else{
    return res.status(500).send({message:"internal server error", staus:"false"})
   }
}



module.exports = ErrorHandler  