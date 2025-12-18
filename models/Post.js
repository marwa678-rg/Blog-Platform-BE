
//Imports
const mongoose= require("mongoose");



//TODO:POST MODEL
const postSchema = new mongoose.Schema({
  title:{type:String,required:true,trim:true},
  caption:{type:String,default:""},
  images:[String],
  content:{type:String,required:true},
  tags:[{type:String,trim:true}],
  //refs
  categoryId:{type:mongoose.Types.ObjectId,ref:"Category",required:true},
  userId:{type:mongoose.Types.ObjectId,ref:"User",required:true},

  likes:[{type:mongoose.Types.ObjectId,ref:"User"}],

status:{type:String,enum:["draft","published"],default:"published"},

},{timestamps:true})




const Post = mongoose.model("Post",postSchema)

module.exports={Post}