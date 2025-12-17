//Imports
const express = require("express");
const dotenv = require("dotenv");
const { connectToDatabase } = require("./config/db.config");


//Global Configs
dotenv.config();



//APP
const app= express();
const PORT= process.env.Port || 3000;



//Main Routes
app.get("/", (request,response)=>{
  response.send("Welcome To Our Backend .")
});

//Connect To DB
connectToDatabase();

//Run Server
app.listen(PORT,function(){
  console.log(`SERVER RUNNING @ PORT :${PORT}`)
})


