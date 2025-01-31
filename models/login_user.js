const mongoose = require("mongoose");

const LoginUserSchema = new mongoose.Schema(
  {
  email: { type: String,require: true },
  password: { type: String,require: true },
  isAdmin:{ type:String,default:false}
}
,{timestamps:true});
const LoginUser = mongoose.model("login_user",LoginUserSchema);
module.exports = LoginUser;


