const { Post } = require("../models/Post");
const { createPostSchema } = require("../validation/postValidation");


//TODO:Create Post
async function createPost(request,response){
  try {
    const userId = request.user.id;
 //validate data
 const {error,value}=createPostSchema.validate(request.body,{abortEarly:false})
if(error){
  return response.status(400).json({messages:error.details.map((e)=>e.message)})
}
//extract Data
const{content,title,categoryId}= value;
//Handle images:

  const images= request.files.map((file)=>file.path);
  const post = await Post.create({title,
  content,
  userId,
  categoryId,
  images,
})
response.status(201).json({message:"Post created successfully",post,})

  } catch (error) {
    console.log(error)
    response.status(500).json({message:"Internal Server Error"})
  }
}
//TODO:Get All Posts 
async function getAllPosts(request,response){
  try {
//pagination
let {page=1,pageSize=10,search=""}=request.query;
const limit=pageSize;
const skip= (page-1)*pageSize;
//search by title & content
    const query ={$or:[
      {title:{$regex:search,$options:"i"}},
      {content:{$regex:search,$options:"i"}},
    ]}
    const posts= await Post.find(query)
    .populate("userId","name profilePic")
    .sort({createdAt:-1})
    .skip(skip)
    .limit(pageSize);
    // total 
     const totalPosts = await Post.countDocuments(query);
    
    response.json({page,pageSize,totalPages:Math.ceil(totalPosts/ pageSize),
      posts
    });


  } catch (error) {
    console.log(error)
    response.status(500).json({message:"Internal Server Error"})
  }
}
//TODO:update post(like / dislike)
async function updatePost(request,response){
try{
const userId =request.user.id;
const postId= request.params.id;
const post= await Post.findById(postId);
if(!post){
  return response.status(404).json({message:"Post Not Found"})
}
//Check user like post
const userExist = post.likes.includes(userId);
if(userExist){
  //un like
  post.likes= post.likes.filter((id)=>id !==userId)
}else{
  post.likes.push(userId)
}
await post.save();
response.json({post,likes:post.likes.length})
  } catch (error) {
      console.log(error)
    response.status(500).json({message:"Internal Server Error"})
  }
}









module.exports={createPost,getAllPosts,updatePost}