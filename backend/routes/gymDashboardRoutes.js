const express = require("express");
const router = express.Router();
const {
  checkUserExists,
  createGymDashboard,
  updateWeight,
  markAttendance,
  logDailyCalories,
  getUserDashboard,
  getUserName,
} = require("../controllers/gymDashboardController");

router.post("/:userId/create", checkUserExists, createGymDashboard);
router.post("/:userId/weight", checkUserExists, updateWeight);
router.post("/:userId/attendance", checkUserExists, markAttendance);
router.post("/:userId/calories", checkUserExists, logDailyCalories);
router.get("/:userId", checkUserExists, getUserDashboard);
router.get("/:userId/name", getUserName)

module.exports = router;
