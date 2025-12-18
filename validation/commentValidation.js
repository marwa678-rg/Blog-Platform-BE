

const Joi = require("joi");


const createCommentSchema  = Joi.object({
  text:Joi.string().min(3).required(),
})
module.exports={createCommentSchema}