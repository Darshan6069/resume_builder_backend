const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true },
    location: { type: String, required: true },
    degreeType: { type: String, required: true }, // e.g., Bachelor's, Master's
    fieldOfStudy: { type: String, required: true }, // e.g., Computer Science
    startDate: { type: String, required: true }, // Store as string
    endDate: { type: String, required: true }, // Store as string
  },
  { timestamps: true }
);

const EducationMasterSchema = new mongoose.Schema({
  educationList: { type: [EducationSchema], required: true },
});

module.exports = EducationMasterSchema;