
//Imports
const express=require("express");
const { addComment, getComments, deleteComment } = require("../controllers/commentController");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { roleMiddleware } = require("../middlewares/role.middleware");
const router = express.Router();

//TODO:Add comment
router.post("/posts/:id",authMiddleware,addComment)

//ToDO:get Comments OF poST 
router.get("/posts/:id",getComments)

//TODO:delete comment
router.delete("/:id",authMiddleware,roleMiddleware("admin"),deleteComment)







module.exports=router