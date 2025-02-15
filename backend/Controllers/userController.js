const User = require("../models/UserSchema");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, location, budget, programme, gymEnrolled } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, Email, and Password are required." });
    }

    const newUser = new User({
      name,
      email,
      password,
      location,
      budget,
      programme,
      gymEnrolled
    });

    await newUser.save();
    console.log("User created successfully:", newUser);

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    console.log("Fetching all users...");
    const users = await User.find();

    if (!users.length) {
      return res.status(404).json({ message: "No users found." });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};
