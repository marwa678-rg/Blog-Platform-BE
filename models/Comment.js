
//Imports
const mongoose=require("mongoose");


//TODO:COMMENT model
const commentSchema = new mongoose.Schema({

  postId:{type:mongoose.Types.ObjectId,ref:"Post",required:true},
  userId:{type:mongoose.Types.ObjectId,ref:"User",required:true},
  text:{type:String,required:true}
},{timestamps:true})
