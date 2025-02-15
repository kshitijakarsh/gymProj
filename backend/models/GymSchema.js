const mongoose = require("mongoose");

const GymSchema = new mongoose.Schema({
  name: String,
  location: String,
  charges: String,
  programme: String,
  trainer: { type: Boolean, default: false },
  contact: String,
  
});

module.exports = mongoose.model("Gym", GymSchema); 
