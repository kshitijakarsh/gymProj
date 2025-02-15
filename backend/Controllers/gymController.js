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


exports.searchGym = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    if (!keyword) {
      return res.status(400).json({ error: "Keyword is required." });
    }

    // Searching in name, location, or programme (case-insensitive)
    const query = {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
        { programme: { $regex: keyword, $options: "i" } },
      ],
    };

    const gyms = await Gym.find(query); // ✅ Fixed: Changed `Customer.find` to `Gym.find`

    if (gyms.length === 0) {
      return res.status(404).json({ message: "No matching gyms found." });
    }

    res.status(200).json(gyms);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};