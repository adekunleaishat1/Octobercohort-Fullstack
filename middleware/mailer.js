const nodemailer = require("nodemailer")

const sendmail = async(username, email) =>{
    const messageTemplate = `
     <div>
        <h2>Welcome message</h2>
        <ul>
            <li>Name: ${username}</li>
            <li>Email: ${email}</li>
        </ul>
        <div>
            <p>Dear ${username}, </p>
            <p>Welcome to Sqi Alumni Association , You are highly welcome.</p>
        </div>
    </div>
    `
 
  const transporter =  nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    })

    const mailOptions ={
        from:process.env.MAIL_USER,
        to:email,
        subject:"Welcome Message",
        html:messageTemplate
    }
   
    try {
     const sentmail =  await  transporter.sendMail(mailOptions)
     if (sentmail) {
       console.log("mail sent");
        
     }
    } catch (error) {
        console.log(error);
        
    }
  
}


module.exports = {sendmail}