//imports
const Joi = require("joi");


const registerSchema = Joi.object({
  name:Joi.string().min(3).required(),
  email:Joi.string().email().required(),
  password:Joi.string().min(6).required(),
});



const verifySchema= Joi.object({
   email:Joi.string().email().required(),
   otp:Joi.string().length(6).required(),
});


const loginSchema=Joi.object({
  email:Joi.string().email().required(),
  password:Joi.string().min(6).required(),
});

const resendOtpSchema=Joi.object({
  email:Joi.string().email().required(),
})

//_____________ profile Info Schemas_______//

const updateProfileSchema =Joi.object({
  name:Joi.string().min(3).optional(),
  bio:Joi.string().optional(),
})
 
module.exports={
  registerSchema,
  verifySchema,
  loginSchema,
  resendOtpSchema,
  updateProfileSchema,
}