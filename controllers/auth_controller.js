const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user_schema");

exports.register = async (req, res) => {
  const { user_name, email, password, phone } = req.body;

  if (!user_name || !email || !password || !phone) {
    return res
      .status(400)
      .json({ success: false, msg: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      return res.json({
        success: false,
        msg: "This Email or Phone is already in use.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      user_name,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      msg: "User registered successfully.",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error.",
    });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Email and password are required." });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ success: false, msg: "User not found!" });
    }

    const isSame = await bcrypt.compare(password, existingUser.password);
    if (!isSame) {
      return res.status(403).json({ success: false, msg: "Unauthorized" });
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      "your_jwt_secret",
      { expiresIn: "2d" }
    );

    return res
      .status(200)
      .json({ success: true, msg: "User logged in.", token });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Login failed. Try again." });
  }
};
