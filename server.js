const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/resume_builder_data", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// API to check if email or phone exists
app.post("/check-user", async (req, res) => {
  const { email, phone } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      return res.json({ success: false, msg: "This Email or Phone is already in use." });
    }

    return res.json({ success: true, msg: "User can be registered." });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Server error" });
  }
});

// API to register a user
app.post("/register", async (req, res) => {
  const { user_name, email, password, phone } = req.body;

  if (!user_name || !email || !password || !phone) {
    return res.status(400).json({ success: false, msg: "All fields are required." });
  }

  try {
    // Check if email or phone exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      return res.json({ success: false, msg: "This Email or Phone is already in use." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({ user_name, email, password: hashedPassword, phone });
    await newUser.save();

    return res.status(201).json({ success: true, msg: "User registered successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Registration failed. Try again." });
  }
});


app.listen(port, "192.168.70.224", () =>
  console.log(`Server started at http://192.168.70.224:${port}`)
);