const mongoose = require("mongoose");

const GymSchema = new mongoose.Schema({
  name: String,
  location: String,
  charges: Number,
  programme: String,
  trainer: String,
  contact: String,
  
});

module.exports = mongoose.model("Gym", GymSchema); 
