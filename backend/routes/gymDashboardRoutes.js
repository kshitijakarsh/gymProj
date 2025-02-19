import express from "express";
const router = express.Router();
import {
  checkUserExists,
  createGymDashboard,
  updateWeight,
  markAttendance,
  getUserDashboard,
  updateGoals
} from "../Controllers/gymDashboardController.js";
import GymDashboard from "../models/GymDashboard.js";

router.post("/:userId/create", checkUserExists, createGymDashboard);
router.post("/:userId/weight", checkUserExists, updateWeight);
router.post("/:userId/attendance", checkUserExists, markAttendance);
router.get("/:userId", checkUserExists, getUserDashboard);
router.put("/:userId/goals", checkUserExists, updateGoals);

export default router;