//Imports
const mongoose = require("mongoose");
const dotenv=require("dotenv");


//Config
dotenv.config();


//Connection database
async function connectToDatabase(){
try {
  await mongoose.connect(process.env.CONNECTION_STRING);
  console.log(`Mongo Cloud Connected Successfully`)
} catch (error) {
console.log(error)
}
}


module.exports= {connectToDatabase} 