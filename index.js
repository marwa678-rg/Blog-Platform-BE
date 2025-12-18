//Imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const { default: rateLimit }=require("express-rate-limit")

//Internal Imports
const { connectToDatabase } = require("./config/db.config");
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const postsRoutes = require("./routes/postsRoutes");
const commentRoutes=require("./routes/commentRoutes");
const path=require("path")
//Global Configs
dotenv.config();



//APP
const app= express();
const PORT= process.env.PORT || 3000;


//Serve Static files
app.use(express.static(path.join(__dirname,"public")))//SERVER => access default
app.use(express.static(path.join(__dirname,"uploads")))//user front access profilePic


//Global Middlewares
app.use(express.json());
app.use(cors({
  origin:JSON.parse(process.env.PRODUCTION_ENV)?
  process.env.CLIENT_ORIGIN : "*",
}));


//npm i express-rate-limit
//rate Limit
const limiter = rateLimit({
  windowMs:15 * 60 *1000,
  limit:100,
});
app.use(limiter);





//Main Routes
app.get("/",(request,response)=>{
  response.send("Welcome To Our Backend .")
});



//API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users",usersRoutes);
app.use("/api/v1/posts",postsRoutes);
app.use("/api/v1/comments",commentRoutes)
//Connect To DB
connectToDatabase();

//Run Server
app.listen(PORT,function(){
  console.log(`SERVER RUNNING @ PORT :${PORT}`)
})


