const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  description: { type: String, required: true },
});

const 

PersonalInfoSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    jobTitle: { type: String, required: true },
    address: { type: String, required: true },
    links: { type: [LinkSchema], required: true },
  },
  { timestamps: true }
);

// const PersonalInfo = mongoose.model("PersonalInfo", PersonalInfoSchema);
module.exports = PersonalInfoSchema;
