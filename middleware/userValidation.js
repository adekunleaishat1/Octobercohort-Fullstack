const yup = require("yup")

const userValidation = yup.object({
    firstname:yup.string().trim().min(4,"Firstname cannot be less than 4 characters").required("firstname is required"),
    lastname:yup.string().trim().required("lastname is required"),
    email:yup.string().email("must be a valid email").trim().required("email is required"),
    password:yup.string().trim().matches(`^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])`, "password must have atleast one uppercase,a special character and an integer.").required("password is required")
})



module.exports = {userValidation}