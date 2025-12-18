
//Imports

//Internal Imports
const { User } = require("../models/User");
const { updateProfileSchema } = require("../validation/userValidation");





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

//TODO:updateProfile Data
async function updateProfileData(request,response){
  try {
    //validation on profile Info
    const {error,value} =updateProfileSchema.validate(request.body,{abortEarly:false})
    if(error){
      return response.status(400).json({message:error.details.map(e=>e.message)})
    }
    //Extract data
 const userId= request.user.id;   
const{bio,name}= value;

const user = await User.findByIdAndUpdate(userId,{bio,name},{new:true}).select("-password");
//return user front=> slice
response.json({message:"Profile Updated successfully",user});

  } catch (error) {
     console.log(error);
  response.status(500).json({message:"Internal Server Error"})
  }
}
















module.exports={uploadProfilePic,updateProfileData};