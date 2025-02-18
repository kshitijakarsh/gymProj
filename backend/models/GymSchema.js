import mongoose from 'mongoose';

const GymSchema = new mongoose.Schema({
  name: String,
  location: String,
  charges: String,
  programme: String,
  trainer: { type: Boolean, default: false },
  contact: String,
  
});

export default mongoose.model("Gym", GymSchema); 
