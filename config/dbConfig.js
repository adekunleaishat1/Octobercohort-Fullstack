const mongoose = require("mongoose")

const connect = async(uri) =>{
  try {
  const connection = await  mongoose.connect(uri)
  if (connection) {
    console.log("connection to database successful");
  }
  } catch (error) {
    console.log(error);
    
  }
}


module.exports = connect