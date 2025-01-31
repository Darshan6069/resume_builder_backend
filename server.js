const { mongoDbConnection } = require("./views/mongodb_connection");
const express = require("express");
const cors = require("cors");
const app = express();
mongoDbConnection("mongodb://localhost:27017/resume_builder");
app.use(cors());

const port = 3070;

app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);

//Connection
connect;
app.listen(port, "192.168.137.67", () =>
  console.log(`Server started at port ${port}`)
);
