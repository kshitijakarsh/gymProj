import express from "express";
const router = express.Router();
import {
  checkUserExists,
  createGymDashboard,
  updateWeight,
  markAttendance,
  logDailyCalories,
  getUserDashboard,
  getUserName,
  updateGoals
} from "../Controllers/gymDashboardController.js";
import GymDashboard from "../models/GymDashboard.js";

router.post("/:userId/create", checkUserExists, createGymDashboard);
router.post("/:userId/weight", checkUserExists, updateWeight);
router.post("/:userId/attendance", checkUserExists, markAttendance);
router.post("/:userId/calories", checkUserExists, logDailyCalories);
router.get("/:userId", checkUserExists, getUserDashboard);
router.get("/:userId/name", getUserName);
router.put("/:userId/goals", checkUserExists, updateGoals);

export default router;