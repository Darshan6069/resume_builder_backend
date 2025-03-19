const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    employer: { type: String, required: true },
    jobTitle: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: String, required: true }, // Store as string
    endDate: { type: String, required: true }, // Store as string
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const ExperienceMasterSchema = new mongoose.Schema({
  experienceList: { type: [ExperienceSchema], required: true },
});

module.exports = ExperienceMasterSchema;