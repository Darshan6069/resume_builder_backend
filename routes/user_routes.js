const express = require("express");
const userController = require("../controllers/user_controller");
const { verifyToken } = require("../middleware/middlewares");
const router = express.Router();
router.post("/personal_info", verifyToken, userController.addPersonalInfo);
router.post("/education_info", verifyToken, userController.addEducationInfo);
router.post("/experience_info", verifyToken, userController.addExperienceInfo);
router.post("/project_info", verifyToken, userController.addProjectInfo);
router.post("/achievement_info", verifyToken, userController.addAchievementInfo);
router.post("/skillset", verifyToken, userController.addSkillsInfo);

module.exports = router;
