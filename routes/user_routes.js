const express = require("express");
const router = express.Router();
const personalInfoController = require("../controllers/user_controller");
const verifyToken = require("../middleware/middlewares");

router.post(
  "/personal-info",
  verifyToken,
  personalInfoController.createPersonalInfo
);

module.exports = router;
