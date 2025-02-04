const mongoose = require("mongoose");

const SkillsSchema = new mongoose.Schema(
  {
    categories: {
      type: Map,
      of: [String], // Map where each key is a category and the value is an array of skills
      required: true,
    },
    selectedCategories: { type: String, required: true }, // Selected skill category
  },
  { timestamps: true }
);

// const Skills = mongoose.model("Skills", SkillsSchema);
module.exports = SkillsSchema;
