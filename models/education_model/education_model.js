// const mongoose = require("mongoose");

// const EducationSchema = new mongoose.Schema(
//   {
//     institution: { type: String, required: true },
//     location: { type: String, required: true },
//     degreeType: { type: String, required: true }, // e.g., Bachelor's, Master's
//     fieldOfStudy: { type: String, required: true }, // e.g., Computer Science
//     startDate: { type: String, required: true },
//     endDate: { type: Date, required: true },
//   },
//   { timestamps: true }
// );

// // const Education = mongoose.model("Education", EducationSchema);
// module.exports = EducationSchema;
const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true },
    location: { type: String, required: true },
    degreeType: { type: String, required: true }, // e.g., Bachelor's, Master's
    fieldOfStudy: { type: String, required: true }, // e.g., Computer Science
    startDate: { type: String, required: true }, // Storing as Date for proper formatting
    endDate: { type: String, required: true },
  },
  { timestamps: true }
);

const EducationMasterSchema = new mongoose.Schema({
  educationList: { type: [EducationSchema], required: true },
});

module.exports = EducationMasterSchema;
