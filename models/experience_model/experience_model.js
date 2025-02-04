const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    employer: { type: String, required: true },
    jobTitle: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

// const Experience = mongoose.model("Experience", ExperienceSchema);
module.exports = ExperienceSchema;
