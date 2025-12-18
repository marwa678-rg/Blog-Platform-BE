
//Imports
const Joi= require("joi");

const createPostSchema=Joi.object({
  title:Joi.string().min(3).required(),
  content:Joi.string().min(3).required(),
  categoryId:Joi.string().required(),

})













module.exports={createPostSchema}