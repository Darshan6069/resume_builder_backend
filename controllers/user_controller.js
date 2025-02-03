const PersonalInfo = require("../models/resume_model/personal_info");

exports.createPersonalInfo = async (req, res) => {
  const { firstname, lastname, email, phone, jobTitle, address, links } =
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
    const existingUser = await PersonalInfo.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "Email or phone already exists." });
    }

    const newPersonalInfo = new PersonalInfo({
      firstname,
      lastname,
      email,
      phone,
      jobTitle,
      address,
      links,
    });

    const savedPersonalInfo = await newPersonalInfo.save();
    res
      .status(201)
      .json({
        success: true,
        msg: "Personal info created successfully.",
        data: savedPersonalInfo,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: "Failed to create personal info.", error });
  }
};
