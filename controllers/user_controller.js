// const User = require("../models/user_schema");

// const addPersonalInfo = async (req, res) => {
//   const { firstname, lastname, phone, email, jobTitle, address, links } =
//     req.body;

//   if (
//     !firstname ||
//     !lastname ||
//     !email ||
//     !phone ||
//     !jobTitle ||
//     !address ||
//     !links
//   ) {
//     return res
//       .status(400)
//       .json({ success: false, msg: "All fields are required." });
//   }

//   try {
//     const newPersonalInfo = {
//       firstname,
//       lastname,
//       email,
//       phone,
//       jobTitle,
//       address,
//       links,
//     };

//     const updated = await User.updateOne(
//       { _id: req.user.id },
//       { personal_info: newPersonalInfo }
//     );

//     if (updated.nModified === 0) {
//       return res.status(404).json({ success: false, msg: "User not found." });
//     }

//     res.status(201).json({
//       success: true,
//       msg: "Personal info added successfully.",
//       data: updated,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, msg: "Failed to add personal info.", error });
//   }
// };

// const addEducationInfo = async (req, res) => {
//   const { educationList } = req.body;

//   if (
//     !educationList ||
//     !Array.isArray(educationList) ||
//     educationList.length === 0
//   ) {
//     return res
//       .status(400)
//       .json({
//         success: false,
//         msg: "Education list is required and should be a non-empty array.",
//       });
//   }

//   for (const education of educationList) {
//     const {
//       institution,
//       location,
//       degreeType,
//       fieldOfStudy,
//       startDate,
//       endDate,
//     } = education;

//     if (
//       !institution ||
//       !location ||
//       !degreeType ||
//       !fieldOfStudy ||
//       !startDate ||
//       !endDate
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           msg: "All fields are required for each education entry.",
//         });
//     }
//   }

//   try {
//     const updated = await User.updateOne(
//       { _id: req.user.id },
//       { $push: { "education_info.educationList": { $each: educationList } } }
//     );

//     if (updated.nModified === 0) {
//       return res.status(404).json({ success: false, msg: "User not found." });
//     }

//     res.status(201).json({
//       success: true,
//       msg: "Education info added successfully.",
//       data: updated,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, msg: "Failed to add education info.", error });
//   }
// };

// const addExperienceInfo = async (req, res) => {
//   const { experienceList } = req.body;

//   if (
//     !experienceList ||
//     !Array.isArray(experienceList) ||
//     experienceList.length === 0
//   ) {
//     return res
//       .status(400)
//       .json({
//         success: false,
//         msg: "Experience list is required and should be a non-empty array.",
//       });
//   }

//   for (const experience of experienceList) {
//     const { employer, jobTitle, location, startDate, endDate, description } =
//       experience;

//     if (
//       !employer ||
//       !jobTitle ||
//       !location ||
//       !startDate ||
//       !endDate ||
//       !description
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           msg: "All fields are required for each experience entry.",
//         });
//     }
//   }

//   try {
//     const updated = await User.updateOne(
//       { _id: req.user.id },
//       { $push: { "experience_info.experienceList": { $each: experienceList } } }
//     );

//     if (updated.nModified === 0) {
//       return res.status(404).json({ success: false, msg: "User not found." });
//     }

//     res.status(201).json({
//       success: true,
//       msg: "Experience info added successfully.",
//       data: updated,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, msg: "Failed to add experience info.", error });
//   }
// };

// const addProjectInfo = async (req, res) => {
//   const { projectList } = req.body;

//   if (!projectList || !Array.isArray(projectList) || projectList.length === 0) {
//     return res.status(400).json({
//       success: false,
//       msg: "Project list is required and should be a non-empty array.",
//     });
//   }

//   for (const project of projectList) {
//     const { projectTitle, technologiesUsed, projectLink, projectDescription } =
//       project;

//     if (
//       !projectTitle ||
//       !technologiesUsed ||
//       !projectLink ||
//       !projectDescription
//     ) {
//       return res.status(400).json({
//         success: false,
//         msg: "All fields are required for each project entry.",
//       });
//     }
//   }

//   try {
//     const updated = await User.updateOne(
//       { _id: req.user.id },
//       { $push: { "project_info.projectList": { $each: projectList } } }
//     );

//     if (updated.nModified === 0) {
//       return res.status(404).json({ success: false, msg: "User not found." });
//     }

//     res.status(201).json({
//       success: true,
//       msg: "Project info added successfully.",
//       data: updated,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, msg: "Failed to add project info.", error });
//   }
// };

// module.exports = { addPersonalInfo,addEducationInfo,addExperienceInfo ,addProjectInfo};

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
    return res.status(400).json({
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
      return res.status(400).json({
        success: false,
        msg: "All fields are required for each education entry.",
      });
    }
  }

  try {
    console.log("User ID:", req.user?.id);
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found." });
    }

    const currentEducationCount =
      user.education_info?.educationList?.length || 0;
    const newEducationCount = currentEducationCount + educationList.length;

    if (newEducationCount > 4) {
      return res.status(400).json({
        success: false,
        msg: "You can only add up to 4 education entries.",
      });
    }

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { "education_info.educationList": { $each: educationList } } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, msg: "User not found." });
    }

    res.status(201).json({
      success: true,
      msg: "Education info added successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("Error adding education info:", error);
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
    return res.status(400).json({
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
      return res.status(400).json({
        success: false,
        msg: "All fields are required for each experience entry.",
      });
    }
  }

  try {
    console.log("User ID:", req.user?.id);
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found." });
    }

    const currentExperienceCount =
      user.experience_info?.experienceList?.length || 0;
    const newExperienceCount = currentExperienceCount + experienceList.length;

    if (newExperienceCount > 4) {
      return res.status(400).json({
        success: false,
        msg: "You can only add up to 4 experience entries.",
      });
    }

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { "experience_info.experienceList": { $each: experienceList } },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, msg: "User not found." });
    }

    res.status(201).json({
      success: true,
      msg: "Experience info added successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("Error adding experience info:", error);
    res
      .status(500)
      .json({ success: false, msg: "Failed to add experience info.", error });
  }
};


const addProjectInfo = async (req, res) => {
  const { projectList } = req.body;

  if (!projectList || !Array.isArray(projectList) || projectList.length === 0) {
    return res.status(400).json({
      success: false,
      msg: "Project list is required and should be a non-empty array.",
    });
  }

  for (const project of projectList) {
    const { projectTitle, technologiesUsed, projectLink, projectDescription } =
      project;

    if (
      !projectTitle ||
      !technologiesUsed ||
      !projectLink ||
      !projectDescription
    ) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required for each project entry.",
      });
    }
  }

  try {
    console.log("User ID:", req.user?.id);
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found." });
    }

    const currentProjectCount = user.project_info?.projectList?.length || 0;
    const newProjectCount = currentProjectCount + projectList.length;

    if (newProjectCount > 4) {
      return res.status(400).json({
        success: false,
        msg: "You can only add up to 4 project entries.",
      });
    }

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { "project_info.projectList": { $each: projectList } } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, msg: "User not found." });
    }

    res.status(201).json({
      success: true,
      msg: "Project info added successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("Error adding project info:", error);
    res
      .status(500)
      .json({ success: false, msg: "Failed to add project info.", error });
  }
};

module.exports = {
  addPersonalInfo,
  addEducationInfo,
  addExperienceInfo,
  addProjectInfo,
};