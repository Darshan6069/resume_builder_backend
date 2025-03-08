const mongoose = require("mongoose");
const EducationMasterSchema = require("./education_model/education_model");
const PersonalInfoSchema = require("./personal_info_model/personal_info_schema");
const ExperienceMasterSchema = require("./experience_model/experience_model");


const UserSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  personal_info: PersonalInfoSchema,
  education_info:EducationMasterSchema,
  experience_info: ExperienceMasterSchema, // Add experience_info here
});

const User = mongoose.model("registration_models", UserSchema);
module.exports = User;
