const mongoose = require("mongoose");

const DeclarationSchema = new mongoose.Schema(
  {
    honorAwardTitle: { type: String, required: true }, // Title of the honor or award
  },
  { timestamps: true }
);

module.exports = DeclarationSchema;
