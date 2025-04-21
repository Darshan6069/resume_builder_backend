const mongoose = require("mongoose");

const DeclarationSchema = new mongoose.Schema(
  {
    honorAwardTitle: {
      type: [String],
      required: true,
    },
  },
  { _id: false } // optional, to avoid automatic _id in sub-docs
);

const DeclarationMasterSchema = new mongoose.Schema(
  {
    declarationList: {
      type: [DeclarationSchema],
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = DeclarationMasterSchema;
