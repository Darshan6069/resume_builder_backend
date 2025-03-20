
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { mongoDbConnection } = require("./views/mongodb_connection");
const secretKey = process.env.JWT_SECRET;

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoDbConnection("mongodb://localhost:27017/resume_builder_data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const authRoutes = require("./routes/auth_routes");
const userRoutes = require("./routes/user_routes");

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

// app.listen(port, "192.168.1.27", () =>
  app.listen(port, "192.168.143.67", () =>
    console.log(`Server started at http://192.168.149.67:${port}`)
  );