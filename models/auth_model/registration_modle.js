const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("registration_model", UserSchema);
module.exports = User;
