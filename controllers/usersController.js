
//Imports

//Internal Imports
const { User } = require("../models/User");





//TODO:UPLOAD ProfilePic
async function uploadProfilePic(request,response){
try {
  //Get UserId
  const userId = request.user.id;

//check request.file
if(!request.file){
  return response.status(400).json({message:"Profile image is required"})
}
//get image upload
const profilePic = request.file.path;
//update user=> profilePic
const user = await User.findByIdAndUpdate(userId,
  {profilePic},
  {new:true});
  if(!user){
    return response.status(404).json({message:"User Not Found"})
  }


response.json({message:"profile picture uploaded",profilePic:user.profilePic})
} catch (error) {
  console.log(error);
  response.status(500).json({message:"Internal Server Error"})
}
}
















module.exports={uploadProfilePic};