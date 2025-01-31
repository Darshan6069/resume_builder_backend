const User = require("../models/login_user");

async function handleLoginUser(req, res) {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({password: password, email: email});
    return res.status(200).json(user);}
  catch (error) {
    return res.status(500).json({ message: "Server error" });
  }}