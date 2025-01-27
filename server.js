const express = require("express");
const fs = require('fs');
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");


const app = express();
app.use(cors());
const port = 3070;

//Connection
mongoose
  .connect("mongodb://localhost:27017/resume_builder")
  .then(() => console.log("mongodb connected to resume_builder"))
  .catch((err) => console.log("mongo error at resume_builder"));


