
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
name:{type:String,trim:true},
email:{type:String,unique:true,required:true},
password:{type:String,required:true},
role:{type:String,enum:["user","admin"]},

otp:{type:String,maxLength:6},
otpExpires:{type:Date},
isVerify:{type:Boolean,default:false},
//count of Request of OTP => prevent spam
otpRequestCount:{type:Number,default:0}

});


const User = mongoose.model("User", userSchema);

module.exports={User};