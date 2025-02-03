const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
// const { addPersonalInfo } = require("../controllers/user_controller");
// const verifyToken = require("../middleware/middlewares");

router.post(
  "/personal-info",
  userController.addPersonalInfo
  // verifyToken,
  // personalInfoController.createPersonalInfo
);

module.exports = router;
