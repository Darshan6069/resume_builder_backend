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

module.exports = PersonalInfoSchema;
