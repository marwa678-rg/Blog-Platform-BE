//Imports
const express=require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { upload } = require("../utilies/uploads");
const { createPost, getAllPosts,updatePost, deletePost} = require("../controllers/postsController");
const { roleMiddleware } = require("../middlewares/role.middleware");


const router = express.Router();

//CREATE post
router.post("/create",authMiddleware,upload.array("images",5),createPost)
//Get All Posts
router.get("/getposts",getAllPosts)
//Update post=>
router.put("/:id/like",authMiddleware,updatePost)
//delete post 
router.delete("/:id",authMiddleware,roleMiddleware("admin"),deletePost)










module.exports=router