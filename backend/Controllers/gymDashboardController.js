import GymDashboard from "../models/GymDashboard.js";
import Users from "../models/UserSchema.js";

export const checkUserExists = async (req, res, next) => {
  const { userId } = req.params;

  try {    
    const user = await Users.findOne({ userId: userId });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error while checking user" });
  }
};

export const createGymDashboard = async (req, res) => {
  const { userId } = req.params;

  try {
    const existingDashboard = await GymDashboard.findOne({ userId: userId });
    if (existingDashboard) {
      return res.status(400).json({ message: "Dashboard already exists" });
    }

    const dashboard = new GymDashboard({
      userId: userId,
      monthlyData: [],
      attendance: [], 
      targetWeight: null,  
      height: null, 
      calorieTarget: null,  
      currentWeight: null, 
    });

    await dashboard.save();

    req.user.gymDashboard = dashboard._id;
    await req.user.save();

    res.status(201).json({ message: "Gym Dashboard created", dashboard });
  } catch (error) {
    res.status(500).json({ message: "Error creating dashboard" });
  }
};

export const updateWeight = async (req, res) => {
  const { month, weight } = req.body;
  
  const { userId } = req.params;

  try {
    if (isNaN(weight) || weight <= 0) {
      return res.status(400).json({ message: "Invalid weight value" });
    }

    const dashboard = await GymDashboard.findOne({ userId: userId });
    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }

    month = month.toISOString().split('T')[0];

    dashboard.monthlyData.push({
      month: month,
      weight: weight
    });

    dashboard.currentWeight = weight;

    await dashboard.save();
    res.json({ 
      message: "Weight updated successfully",
      dashboard: {
        currentWeight: dashboard.currentWeight,
        monthlyData: dashboard.monthlyData
      }
    });

  } catch (error) {
    console.error(`[ERROR] Error updating weight: ${error.message}`);
    res.status(500).json({ message: "Error updating weight" });
  }
};

export const markAttendance = async (req, res) => {
  const { userId } = req.params;
  const { month, day } = req.body;

  try {
    const dashboard = await GymDashboard.findOne({ userId });
    
    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }

    let monthAttendance = dashboard.attendance.find(
      record => record.month === month
    );

    if (!monthAttendance) {
      monthAttendance = {
        month,
        daysPresent: [day]
      };
      dashboard.attendance.push(monthAttendance);
    } else {
      const dayIndex = monthAttendance.daysPresent.indexOf(day);
      if (dayIndex > -1) {
        monthAttendance.daysPresent.splice(dayIndex, 1);
      } else {
        monthAttendance.daysPresent.push(day);
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


export const getUserDashboard = async (req, res) => {
  const { userId } = req.params;

  try {
    const dashboard = await GymDashboard.findOne({ userId });
    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }

    const user = await Users.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const dashboardData = {
      ...dashboard.toObject(),
      userName: user.name
    };

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching dashboard data",
      error: error.message 
    });
  }
};

export const updateGoals = async (req, res) => {
  try {
    const { userId } = req.params;
    const { targetWeight, calorieTarget, height } = req.body;
    
    const dashboard = await GymDashboard.findOne({ userId });
    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }
    
    dashboard.targetWeight = targetWeight || dashboard.targetWeight;
    dashboard.calorieTarget = calorieTarget || dashboard.calorieTarget;
    dashboard.height = height || dashboard.height;
    
    await dashboard.save();
    
    res.json({
      targetWeight: dashboard.targetWeight,
      calorieTarget: dashboard.calorieTarget,
      height: dashboard.height
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating goals" });
  }
};

export default {
  checkUserExists,
  createGymDashboard,
  updateWeight,
  markAttendance,
  getUserDashboard,
  updateGoals
};
