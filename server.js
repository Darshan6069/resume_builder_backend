const { mongoDbConnection } = require("./views/mongodb_connection");
const RegisterUser = require("./models/registration_modle");
const express = require("express");
const CryptoJS = require("crypto-js");
const cors = require("cors");
const app = express();

mongoDbConnection("mongodb://localhost:27017/resume_builder");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 8000;

app.post("/register", async (req, res) => {
  const { username, email, password, phoneno } = req.body;

  try {
    const u1 = await RegisterUser.findOne({ email: email });
    const u2 = await RegisterUser.findOne({ phone: phoneno });
    if (u1) {
      res
        .status(200)
        .json({ success: false, msg: "This Email is already in use." });
      return;
    }
    if (u2) {
      res
        .status(200)
        .json({ success: false, msg: "This phone no is already in use." });
      return;
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msg: "Something went wrong with your server!" });
    return;
  }

  // Adding user if no duplicate found!
  const newUser = new RegisterUser({
    username: username,
    email: email,
    password: CryptoJS.AES.encrypt(password, "secret key").toString(),
    phone: phoneno,
  });

  try {
    const saveUser = await newUser.save();
    res.status(200).json({
      success: true,
      msg: "User Registered Successfully",
      data: saveUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msg: "Could not register User.", data: err });
  }
});

app.listen(port, "192.168.137.67", () =>
  console.log(`Server started at http://192.168.137.67:${port}`)
);