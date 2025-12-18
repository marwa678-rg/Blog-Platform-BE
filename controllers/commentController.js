const { Post } = require("../models/Post");


//TODO:AddComment
async function addComment(request,response){
  try {
    const userId = request.user.id;
    const postId= request.params.id;
    //validate
    const {error,value}= createCommentSchema.validate(request.body,{abortEarly:false})
    if(error){
      return response.status(400).json({messages:error.details.map((e)=>e.message)})
    }
//extract data 
const {text}=value;
//check post 
const post= await Post.findById(postId);
if(!post){
  return response.status(404).json({message:"Post Not Found"})
}
//add Comment
const comment= await Comment.create({
  postId,
userId,
  text :text
})
response.status(201).json({message:"Comment added Successfully"})
  } catch (error) {
    console.log(error)
    response.status(500).json({message:"Internal Server Error"})
  }
}
//TODO:Get COmments of post 
async function getComments(request,response){
  try {
      const postId = request.params.id;

    
    const comments = await Comment.find({ postId })
      .populate("userId", "name profilePic")
      .sort({ createdAt: -1 });

    response.json({ comments });
  } catch (error) {
     console.log(error)
    response.status(500).json({message:"Internal Server Error"})
  }
}
//ToDo:Delete comment
async function deleteComment(request,response){
  try {
    const commentId = request.params.id;
    const userId = request.user.id;
    const role = request.user.role
    //check comment
    const comment= await Comment.findById(commentId);
    if(!comment){
      return response.status(404).json({message:"Comment Not Found"})
    }
    //check user validation
    if(comment.userId !== userId && role !== "admin"){
      return response.status(403).json({message:"unauthorized"})
    }
    await comment.deleteOne();
response.json({message:"Comment Deleted Successfully"})
  } catch (error) {
         console.log(error)
    response.status(500).json({message:"Internal Server Error"})
  }
}









module.exports={addComment,getComments,deleteComment}