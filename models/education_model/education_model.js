const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true },
    location: { type: String, required: true },
    degreeType: { type: String, required: true }, // e.g., Bachelor's, Master's
    fieldOfStudy: { type: String, required: true }, // e.g., Computer Science
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

// const Education = mongoose.model("Education", EducationSchema);
module.exports = EducationSchema;
