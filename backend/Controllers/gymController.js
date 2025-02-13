const Gym = require("../models/GymSchema"); 

exports.getGym = async (req, res) => {
  try {
    const gyms = await Gym.find();
    res.json(gyms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createGym = async (req, res) => {
  try {
    const { name, location, charges, programme, trainer, contact } = req.body;

    const newGym = new Gym({  
      name,
      location,
      charges,
      programme,
      trainer,
      contact,
    });

    await newGym.save();
    res.json({ message: "Gym created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
