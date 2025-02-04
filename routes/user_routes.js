const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const { verifyToken } = require("../middleware/middlewares");

router.post("/personal-info", verifyToken, userController.addPersonalInfo);

module.exports = router;
