const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Title of the achievement
    link: { type: String, required: true },  // Link to the certificate or achievement page
    issuer: { type: String, required: true }, // Issuer of the achievement (e.g., organization name)
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// const Achievement = mongoose.model("Achievement", AchievementSchema);
module.exports = AchievementSchema;
