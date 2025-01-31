const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const user = require("../models/login_user")

const LoginUserSchema = new mongoose.Schema(
  {
  email: { type: String,require: true },
  password: { type: String,require: true },
  isAdmin:{ type:String,default:false}
}
,{timestamps:true});
const LoginUser = mongoose.model("login_user",LoginUserSchema);
module.exports = LoginUser;


