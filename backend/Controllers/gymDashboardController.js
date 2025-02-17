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
      attendance: {},  // Initialize as empty array instead of empty object
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
    console.log(`[INFO] Updating weight for userId: ${userId} for month: ${month}`);

    // Validate inputs
    if (!userId || !month || weight === undefined) {
      console.warn(`[WARNING] Missing required fields`);
      return res.status(400).json({ message: "Missing required fields" });
    }

    let dashboard = await GymDashboard.findOne({ userId: userId });
    if (!dashboard) {
      console.warn(`[WARNING] Dashboard not found for userId: ${userId}`);
      return res.status(404).json({ message: "Dashboard not found" });
    }

    // Ensure weightHistory exists
    if (!dashboard.weightHistory) {
      dashboard.weightHistory = [];
    }

    const monthLower = month.toLowerCase();
    const existingEntry = dashboard.weightHistory.find(entry => entry.month.toLowerCase() === monthLower);

    if (existingEntry) {
      if (existingEntry.weight !== weight) { // Only update if different
        existingEntry.weight = weight;
        dashboard.markModified('weightHistory');  // Tell Mongoose to detect the change
        console.log(`[INFO] Weight updated for userId: ${userId} in month: ${month}`);
      } else {
        console.log(`[INFO] No change in weight for userId: ${userId} in month: ${month}`);
      }
    } else {
      dashboard.weightHistory.push({ month, weight });
      console.log(`[INFO] New weight entry created for userId: ${userId} in month: ${month}`);
    }

    await dashboard.save();
    res.json({ message: "Weight updated", dashboard });

  } catch (error) {
    console.error(`[ERROR] Error updating weight: ${error.message}`);
    res.status(500).json({ message: "Error updating weight" });
  }
};

// Function to mark attendance
const markAttendance = async (req, res) => {
  const { month, day } = req.body;
  const { userId } = req.params;

  try {
    console.log(`[INFO] Received request to mark attendance`);
    
    let dashboard = await GymDashboard.findOne({ userId: userId });
    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }

    // Initialize attendance if it doesn't exist
    if (!dashboard.attendance) {
      dashboard.attendance = new Map();
    }

    // Create a key for the specific day (e.g., "January-15")
    const attendanceKey = `${month}-${day}`;

    // Toggle attendance (true if not present, false if present)
    const currentValue = dashboard.attendance.get(attendanceKey);
    dashboard.attendance.set(attendanceKey, !currentValue);

    // Mark the attendance field as modified
    dashboard.markModified('attendance');
    await dashboard.save();
    
    res.json({ 
      message: "Attendance updated", 
      attendance: Object.fromEntries(dashboard.attendance)
    });

  } catch (error) {
    console.error(`[ERROR] Error marking attendance: ${error.stack || error.message}`);
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
    console.log(`[INFO] Fetching dashboard for userId: ${userId}`);
    let dashboard = await GymDashboard.findOne({ userId: userId });

    if (!dashboard) {
      console.log(`[INFO] No dashboard found for userId: ${userId}, creating new dashboard`);
      dashboard = new GymDashboard({ userId: userId });
      await dashboard.save();

      const user = await Users.findOne({ userId: userId });
      if (user) {
        user.gymDashboard = dashboard._id;
        await user.save();
      }

      console.log(`[INFO] New dashboard created for userId: ${userId}`);
      return res.status(201).json({ message: "New dashboard created", dashboard });
    }

    console.log(`[INFO] Dashboard found for userId: ${userId}`);
    res.json(dashboard);
  } catch (error) {
    console.error(`[ERROR] Error fetching or creating dashboard for userId: ${userId} - ${error.message}`);
    res.status(500).json({ message: "Error fetching or creating dashboard" });
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

module.exports = {
  checkUserExists,
  createGymDashboard,
  updateWeight,
  markAttendance,
  logDailyCalories,
  getUserDashboard,
  getUserName
};
