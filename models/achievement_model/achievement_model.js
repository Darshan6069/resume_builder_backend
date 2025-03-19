const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, 
    link: { type: String, required: true }, 
    issuer: { type: String, required: true },
  },
  { timestamps: true } 
);

const AchievementMasterSchema = new mongoose.Schema({
  achievements: { type: [AchievementSchema], required: true },
});


module.exports = AchievementMasterSchema;
