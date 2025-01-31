const mongoose = require("mongoose");


const RegistrationSchema = new mongoose.Schema(
  {
  name :{type:String,require:true},
  email: { type: String,require: true },
  password: { type: String,require: true },
  phone:{type:String,require:true},
 
}
,{timestamps:true});
const RegisterUser = mongoose.model("Registration_model",RegistrationSchema);
module.exports = RegisterUser;


