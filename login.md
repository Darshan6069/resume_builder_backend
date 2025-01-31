You can implement **JWT authentication** using **Node.js (Express.js) and MongoDB** for your **Flutter app** by following these steps:  

## **1. Setup Node.js and Express.js**
First, initialize a new Node.js project:  
```sh
mkdir auth-backend && cd auth-backend
npm init -y
```
Then, install the required dependencies:  
```sh
npm install express mongoose dotenv jsonwebtoken bcryptjs cors body-parser
```

## **2. Create the Express Server (`server.js`)**
```javascript
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(require("cors")()); // Enable CORS for Flutter

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## **3. Create the User Model (`models/User.js`)**
```javascript
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
```

---

## **4. Implement Authentication Routes (`routes/auth.js`)**
```javascript
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

// Protected Route Example
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

// Middleware for JWT verification
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
}

module.exports = router;
```

---

## **5. Create a `.env` File**
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## **6. Run the Server**
```sh
node server.js
```
or
```sh
nodemon server.js
```

---

## **7. Flutter Integration**
In your **Flutter app**, install the `http` package:  
```sh
flutter pub add http
```

Create an **API service** (`api_service.dart`):  
```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = "http://your-server-ip:5000/api/auth";

  // Register User
  static Future<Map<String, dynamic>?> registerUser(String name, String email, String password) async {
    final response = await http.post(
      Uri.parse("$baseUrl/register"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"name": name, "email": email, "password": password}),
    );

    return response.statusCode == 201 ? jsonDecode(response.body) : null;
  }

  // Login User
  static Future<Map<String, dynamic>?> loginUser(String email, String password) async {
    final response = await http.post(
      Uri.parse("$baseUrl/login"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"email": email, "password": password}),
    );

    return response.statusCode == 200 ? jsonDecode(response.body) : null;
  }
}
```

---

## **8. Login & Register UI in Flutter**
Here’s a simple Flutter UI for login:

```dart
import 'package:flutter/material.dart';
import 'package:your_app/api_service.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  void login() async {
    final response = await ApiService.loginUser(emailController.text, passwordController.text);
    if (response != null) {
      print("Login Success: ${response['token']}");
    } else {
      print("Login Failed");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Login")),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(controller: emailController, decoration: InputDecoration(labelText: "Email")),
            TextField(controller: passwordController, decoration: InputDecoration(labelText: "Password"), obscureText: true),
            SizedBox(height: 20),
            ElevatedButton(onPressed: login, child: Text("Login")),
          ],
        ),
      ),
    );
  }
}
```

---

### **🔹 Summary**
- **Backend:** Node.js, Express.js, MongoDB, JWT
- **Security:** Password hashing (`bcryptjs`), token-based authentication (`jsonwebtoken`)
- **Flutter Integration:** `http` package to communicate with the backend  

Would you like to add **Google OAuth** or any other feature? 🚀