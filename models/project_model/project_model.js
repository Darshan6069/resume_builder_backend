const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    projectTitle: { type: String, required: true },
    technologiesUsed: { type: String, required: true },
    projectLink: { type: String, required: true },
    projectDescription: { type: String, required: true },
  },
  { timestamps: true }
);

// const Project = mongoose.model("Project", ProjectSchema);
module.exports = ProjectSchema;
