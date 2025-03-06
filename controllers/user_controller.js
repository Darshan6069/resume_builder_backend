const User = require("../models/user_schema");

const addPersonalInfo = async (req, res) => {
  const { firstname, lastname, phone, email, jobTitle, address, links } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !jobTitle ||
    !address ||
    !links
  ) {
    return res
      .status(400)
      .json({ success: false, msg: "All fields are required." });
  }

  try {
    const newPersonalInfo = {
      firstname,
      lastname,
      email,
      phone,
      jobTitle,
      address,
      links,
    };

    const updated = await User.updateOne(
      { _id: req.user.id },
      { personal_info: newPersonalInfo }
    );

    if (updated.nModified === 0) {
      return res.status(404).json({ success: false, msg: "User not found." });
    }

    res.status(201).json({
      success: true,
      msg: "Personal info added successfully.",
      data: updated,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: "Failed to add personal info.", error });
  }
};

const addEducationInfo = async (req, res) => {
  const { educationList } = req.body;

  if (
    !educationList ||
    !Array.isArray(educationList) ||
    educationList.length === 0
  ) {
    return res
      .status(400)
      .json({
        success: false,
        msg: "Education list is required and should be a non-empty array.",
      });
  }

  for (const education of educationList) {
    const {
      institution,
      location,
      degreeType,
      fieldOfStudy,
      startDate,
      endDate,
    } = education;

    if (
      !institution ||
      !location ||
      !degreeType ||
      !fieldOfStudy ||
      !startDate ||
      !endDate
    ) {
      return res
        .status(400)
        .json({
          success: false,
          msg: "All fields are required for each education entry.",
        });
    }
  }

  try {
    const updated = await User.updateOne(
      { _id: req.user.id },
      { $push: { "education_info.educationList": { $each: educationList } } }
    );

    if (updated.nModified === 0) {
      return res.status(404).json({ success: false, msg: "User not found." });
    }

    res.status(201).json({
      success: true,
      msg: "Education info added successfully.",
      data: updated,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: "Failed to add education info.", error });
  }
};

const addExperienceInfo = async (req, res) => {
  const { experienceList } = req.body;

  if (
    !experienceList ||
    !Array.isArray(experienceList) ||
    experienceList.length === 0
  ) {
    return res
      .status(400)
      .json({
        success: false,
        msg: "Experience list is required and should be a non-empty array.",
      });
  }

  for (const experience of experienceList) {
    const { employer, jobTitle, location, startDate, endDate, description } =
      experience;

    if (
      !employer ||
      !jobTitle ||
      !location ||
      !startDate ||
      !endDate ||
      !description
    ) {
      return res
        .status(400)
        .json({
          success: false,
          msg: "All fields are required for each experience entry.",
        });
    }
  }

  try {
    const updated = await User.updateOne(
      { _id: req.user.id },
      { $push: { "experience_info.experienceList": { $each: experienceList } } }
    );

    if (updated.nModified === 0) {
      return res.status(404).json({ success: false, msg: "User not found." });
    }

    res.status(201).json({
      success: true,
      msg: "Experience info added successfully.",
      data: updated,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: "Failed to add experience info.", error });
  }
};

module.exports = { addPersonalInfo, addEducationInfo, addExperienceInfo };
