const mongoose = require('mongoose');

// Schema definition for the GymDashboard
const gymDashboardSchema = new mongoose.Schema({
  userId: {
    type: String, // Changed from ObjectId to String
    required: true,
  },
  monthlyData: [
    {
      month: {
        type: String,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
    },
  ],
  attendance: {
    type: Map,
    of: Boolean,
    default: {}
  },
  targetWeight: {
    type: Number,
    required: false, // Changed to false
    default: null
  },
  height: {
    type: Number,
    required: false, // Changed to false
    default: null
  },
  calorieTarget: {
    type: Number,
    required: false, // Changed to false
    default: null
  },
  currentWeight: {
    type: Number,
    required: false, // Changed to false
    default: null
  },
});

// Create a model for GymDashboard based on the schema
const GymDashboard = mongoose.model('GymDashboard', gymDashboardSchema);

module.exports = GymDashboard;
