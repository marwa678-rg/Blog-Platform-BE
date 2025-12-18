
const express=require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { upload } = require("../utilies/uploads");
const { User } = require("../models/User");
const { uploadProfilePic, updateProfileData, getUserPosts } = require("../controllers/usersController");
const router= express.Router();


//upload image
router.put("/profile/update",authMiddleware,upload.single("image"),uploadProfilePic)
 //update name or bio 
 router.patch("/profile/update", authMiddleware,updateProfileData) 
//Get user posts
router.get("/:id/posts/",getUserPosts)


module.exports=router;