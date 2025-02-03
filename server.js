// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const {mongoDbConnection} = require("./views/mongodb_connection");
// const {verifyToken} = require('./middleware/middlewares');
// const PersonalInfo = require('./models/personal_info');
// const User = require("./models/registration_modle")

// const app = express();
// const port = 8000;

// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoDbConnection("mongodb://localhost:27017/resume_builder_data", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


// app.post("/check-user", async (req, res) => {
//   const { email, phone } = req.body;

//   try {
//     const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

//     if (existingUser) {
//       return res.json({ success: false, msg: "This Email or Phone is already in use." });
//     }

//     return res.json({ success: true, msg: "User can be registered." });
//   } catch (error) {
//     return res.status(500).json({ success: false, msg: "Server error" });
//   }
// });

// // API to register a user
// app.post("/register", async (req, res) => {
//   const { user_name, email, password, phone } = req.body;

//   if (!user_name || !email || !password || !phone) {
//     return res.status(400).json({ success: false, msg: "All fields are required." });
//   }

//   try {
//     // Check if email or phone exists
//     const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

//     if (existingUser) {
//       return res.json({ success: false, msg: "This Email or Phone is already in use." });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save new user
//     const newUser = new User({ user_name, email, password: hashedPassword, phone });
//     await newUser.save();

//     return res.status(201).json({ success: true, msg: "User registered successfully." });
//   } catch (error) {
//     return res.status(500).json({ success: false, msg: "Registration failed. Try again." });
//   }
// });


// app.post("/login", async (req, res) => {
//   const {email, password } = req.body;

//   if (!email || !password) {
//     return res
//       .status(400)
//       .json({ success: false, msg: "All fields are required." });
//   }

//   try {
//     const existingUser = await User.findOne({ email });

//     if (!existingUser) {
//       return res
//         .status(404)
//         .json({ success: false, msg: "not found !" });
//     }

//     const dbPassword =  existingUser.get("password");
//     const isSame = await bcrypt.compare(password, dbPassword);
//       if(!isSame){
//       return res
//         .status(403)
//         .json({ success: false, msg: "unauthorized" });
//     }

//      const token = jwt.sign({id:existingUser.id, email:existingUser.email},
//       'secret-key',{expiresIn:'1h'}); 
//     return res
//       .status(201)
//       .json({ success: true, msg: "User logged in." ,token});
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, msg: "Registration failed. Try again." });
//   }
// });

// app.post("/personal-info", async (req, res) => {
//   const { firstname, lastname, email, phone, jobTitle, address, links } =
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
//     const udpated =  await User.updateOne({ email: email }, { personal_info: newPersonalInfo });
//     // const savedPersonalInfo = await newPersonalInfo.save();
//     res
//       .status(201)
//       .json({ 
//         success: true,
//         msg: "Personal info created successfully.",
//         data: udpated,
//       });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, msg: "Failed to create personal info.", error });
//   }
// });


// app.get('/valid', verifyToken,(req,res)=>{
//   res.json();
// });


// app.listen(port, "192.168.1.15", () =>
//   console.log(`Server started at http://192.168.137.67:${port}`)
// );

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { mongoDbConnection } = require("./views/mongodb_connection");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoDbConnection("mongodb://localhost:27017/resume_builder_data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const authRoutes = require("./routes/auth_routes");
const personalInfoRoutes = require("./routes/user_routes");

app.use("/api/auth", authRoutes);
app.use("/api", personalInfoRoutes);

app.listen(port, "192.168.1.15", () =>
  console.log(`Server started at http://192.168.1.15:${port}`)
);