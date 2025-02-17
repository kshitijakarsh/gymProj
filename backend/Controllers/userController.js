const Users = require("../models/UserSchema");
const GymDashboard = require("../models/GymDashboard"); // ✅ Import GymDashboard model

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, location, budget, programme, gymEnrolled } = req.body;
    console.log(req.body);
    

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, Email, and Password are required." });
    }

    const existingUser = await Users.findOne({ email });


    
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
      
    }

    

    // Create the user first
    const newUser = new Users({
      name,
      email,
      password, // TODO: Hash password before saving
      location,
      budget,
      programme,
      gymEnrolled,
    });

    await newUser.save();
    console.log("User created successfully:", newUser);

    // Create and link the GymDashboard with initial null values
    const newDashboard = new GymDashboard({
      userId: newUser.userId,
      monthlyData: [],
      attendance: [],
      targetWeight: null,
      height: null,
      calorieTarget: null,
      currentWeight: null
    });
    
    await newDashboard.save();

    // Update the user with the gymDashboard reference
    newUser.gymDashboard = newDashboard._id;
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required." });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    res.json({ userId: user.userId });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    console.log("Fetching all users...");
    const users = await Users.find();

    if (!users.length) {
      return res.status(404).json({ message: "No users found." });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};
