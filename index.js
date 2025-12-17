//Imports
const express = require("express");
const dotenv = require("dotenv");


//Global Configs
dotenv.config();

const app= express();
const PORT= process.env.Port || 3000;

app.get("/", (request,response)=>{
  response.send("Welcome To Our Backend .")
})

app.listen(PORT,function(){
  console.log(`SERVER RUNNING @ PORT :${PORT}`)
})


