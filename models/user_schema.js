const mongoose = require("mongoose");

const PersonalInfoSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  jobTitle: { type: String, required: true },
  address: { type: String, required: true },
  links: [
    {
      name: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
});

const UserSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  personal_info: PersonalInfoSchema,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
