const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { handleLoginUser } = require("../controllers/authentication");

router.post("/login", handleLoginUser);