const GymDashboard = require("../models/GymDashboard");
const Users = require("../models/UserSchema");
const mongoose = require("mongoose");

const checkUserExists = async (req, res, next) => {
  const { userId } = req.params;

  try {
    console.log(`[INFO] Checking if user exists with userId: ${userId}`);
    
    // Query using NanoID (string-based userId, NOT ObjectId)
    const user = await Users.findOne({ userId: userId });
    
    if (!user) {
      console.warn(`[WARNING] User not found with userId: ${userId}`);
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    console.log(`[INFO] User found: ${userId}`);
    next();
  } catch (error) {
    console.error(`[ERROR] Failed to check if user exists: ${error.message}`);
    res.status(500).json({ message: "Server error while checking user" });
  }
};

const createGymDashboard = async (req, res) => {
  const { userId } = req.params;

  try {
    console.log(`[INFO] Creating gym dashboard for userId: ${userId}`);

    // Check if the dashboard already exists for the user
    const existingDashboard = await GymDashboard.findOne({ userId: userId });
    if (existingDashboard) {
      console.warn(`[WARNING] Dashboard already exists for userId: ${userId}`);
      return res.status(400).json({ message: "Dashboard already exists" });
    }

    // Create a new GymDashboard document for the user
    const dashboard = new GymDashboard({
      userId: userId,
      monthlyData: [], // Initialize with an empty array for monthly data
      attendance: [],  // Initialize as empty array instead of empty object
      targetWeight: null,  // Initialize with null or default value
      height: null,  // Initialize with null or default value
      calorieTarget: null,  // Initialize with null or default value
      currentWeight: null,  // Initialize with null or default value
    });

    // Save the newly created dashboard
    await dashboard.save();

    // Associate the gym dashboard with the user
    req.user.gymDashboard = dashboard._id;
    await req.user.save();

    console.log(`[INFO] Gym dashboard created successfully for userId: ${userId}`);
    res.status(201).json({ message: "Gym Dashboard created", dashboard });
  } catch (error) {
    console.error(`[ERROR] Error creating dashboard for userId: ${userId} - ${error.message}`);
    res.status(500).json({ message: "Error creating dashboard" });
  }
};

// Function to update weight
const updateWeight = async (req, res) => {
  const { month, weight } = req.body;
  const { userId } = req.params;

  try {
    // Input validation
    if (!userId || !month || !weight) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (isNaN(weight) || weight <= 0) {
      return res.status(400).json({ message: "Invalid weight value" });
    }

    const dashboard = await GymDashboard.findOne({ userId: userId });
    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }

    // Add to weightHistory
    const monthLower = month.toLowerCase();
    const existingHistoryEntry = dashboard.weightHistory.find(
      entry => entry.month.toLowerCase() === monthLower
    );

    if (existingHistoryEntry) {
      existingHistoryEntry.weight = weight;
    } else {
      dashboard.weightHistory.push({ month, weight });
    }

    // Add to monthlyData with date
    const currentDate = new Date().toISOString().split('T')[0];
    dashboard.monthlyData.push({
      date: currentDate,
      weight: weight
    });

    // Update current weight
    dashboard.currentWeight = weight;

    await dashboard.save();
    res.json({ 
      message: "Weight updated successfully",
      dashboard: {
        currentWeight: dashboard.currentWeight,
        weightHistory: dashboard.weightHistory,
        monthlyData: dashboard.monthlyData
      }
    });

  } catch (error) {
    console.error(`[ERROR] Error updating weight: ${error.message}`);
    res.status(500).json({ message: "Error updating weight" });
  }
};

// Function to mark attendance
const markAttendance = async (req, res) => {
  const { userId } = req.params;
  const { month, day } = req.body;

  try {
    const dashboard = await GymDashboard.findOne({ userId });
    
    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }

    // Find the attendance record for the given month
    let monthAttendance = dashboard.attendance.find(
      record => record.month === month
    );

    if (!monthAttendance) {
      // If no record exists for this month, create one
      monthAttendance = {
        month,
        daysPresent: [day]
      };
      dashboard.attendance.push(monthAttendance);
    } else {
      // If the day is already marked, remove it (toggle attendance)
      const dayIndex = monthAttendance.daysPresent.indexOf(day);
      if (dayIndex > -1) {
        monthAttendance.daysPresent.splice(dayIndex, 1);
      } else {
        // If the day isn't marked, add it
        monthAttendance.daysPresent.push(day);
        // Sort the days array to keep it organized
        monthAttendance.daysPresent.sort((a, b) => a - b);
      }
    }

    await dashboard.save();
    
    res.json({ 
      message: "Attendance marked successfully",
      attendance: dashboard.attendance
    });

  } catch (error) {
    console.error("[ERROR] Error marking attendance:", error);
    res.status(500).json({ 
      message: "Error marking attendance",
      error: error.message 
    });
  }
};

// Function to log daily calories
const logDailyCalories = async (req, res) => {
  const { date, calories } = req.body;
  const { userId } = req.params;

  try {
    console.log(`[INFO] Logging calories for userId: ${userId} on date: ${date}`);

    let dashboard = await GymDashboard.findOne({ userId: userId });
    if (!dashboard) {
      console.warn(`[WARNING] Dashboard not found for userId: ${userId}`);
      return res.status(404).json({ message: "Dashboard not found" });
    }

    const existingEntry = dashboard.dailyCalories.find(entry => entry.date === date);
    if (existingEntry) {
      existingEntry.calories = calories;
      console.log(`[INFO] Calories updated for userId: ${userId} on date: ${date}`);
    } else {
      dashboard.dailyCalories.push({ date, calories });
      console.log(`[INFO] New calorie entry created for userId: ${userId} on date: ${date}`);
    }

    await dashboard.save();
    res.json({ message: "Calories logged", dashboard });
  } catch (error) {
    console.error(`[ERROR] Error logging calories for userId: ${userId} - ${error.message}`);
    res.status(500).json({ message: "Error logging calories" });
  }
};

// Function to get user dashboard
const getUserDashboard = async (req, res) => {
  const { userId } = req.params;

  try {
    const dashboard = await GymDashboard.findOne({ userId });
    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }

    // Fetch user data to get the name
    const user = await Users.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Combine dashboard data with user name
    const dashboardData = {
      ...dashboard.toObject(),
      userName: user.name
    };

    res.json(dashboardData);
  } catch (error) {
    console.error("[ERROR] Error fetching dashboard:", error);
    res.status(500).json({ 
      message: "Error fetching dashboard data",
      error: error.message 
    });
  }
};

// Function to get user name
const getUserName = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res.status(400).json({ message: "Bad request: userId is required" });
    }

    const user = await Users.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ name: user.name });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add this to your existing controller functions
const updateGoals = async (req, res) => {
  try {
    const { userId } = req.params;
    const { targetWeight, calorieTarget, height } = req.body;
    
    const dashboard = await GymDashboard.findOne({ userId });
    if (!dashboard) {
      console.warn(`[WARNING] Dashboard not found for userId: ${userId}`);
      return res.status(404).json({ message: "Dashboard not found" });
    }
    
    // Update the fields
    dashboard.targetWeight = targetWeight || dashboard.targetWeight;
    dashboard.calorieTarget = calorieTarget || dashboard.calorieTarget;
    dashboard.height = height || dashboard.height;
    
    await dashboard.save();
    console.log(`[INFO] Goals updated successfully for userId: ${userId}`);
    
    res.json({
      targetWeight: dashboard.targetWeight,
      calorieTarget: dashboard.calorieTarget,
      height: dashboard.height
    });
  } catch (error) {
    console.error(`[ERROR] Error updating goals for userId: ${userId}:`, error);
    res.status(500).json({ message: "Error updating goals" });
  }
};

module.exports = {
  checkUserExists,
  createGymDashboard,
  updateWeight,
  markAttendance,
  logDailyCalories,
  getUserDashboard,
  getUserName,
  updateGoals
};
