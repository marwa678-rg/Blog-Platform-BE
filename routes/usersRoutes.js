
const express=require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { upload } = require("../utilies/uploads");
const { User } = require("../models/User");
const { uploadProfilePic } = require("../controllers/usersController");
const router= express.Router();


//upload image
router.put("/profile/update",authMiddleware,upload.single("image"),uploadProfilePic)
  



module.exports=router;