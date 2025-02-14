const supabase = require("../config/supabase");
const Users = require("../models/UserSchema");
const multer = require("multer");
const fs = require("fs");

// Configure Multer in the controller
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Temporary storage
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.uploadMiddleware = upload.single("image");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    console.log("Fetching all users...");
    const users = await Users.find();

    if (!users.length) {
      console.warn("No users found.");
      return res.status(404).json({ message: "No users found." });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

// Create user with image upload
exports.createUser = async (req, res) => {
  try {
    console.log("Received request to create user:", req.body);

    const { name, email, password, location, budget, programme } = req.body;

    if (!name || !email || !password) {
      console.warn("Missing required fields.");
      return res.status(400).json({ error: "Name, Email, and Password are required." });
    }

    let pfpUrl = null;

    if (req.file) {
      console.log("Uploading image to Supabase...");

      const filePath = req.file.path;
      const fileName = `profiles/${Date.now()}_${req.file.originalname}`;

      // Read file data
      try {
        const fileBuffer = fs.readFileSync(filePath);

        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
          .from("pfp")
          .upload(fileName, fileBuffer, {
            contentType: req.file.mimetype,
          });

        if (error) {
          console.error("Supabase Upload Error:", error.message);
          return res.status(500).json({ error: "Image upload failed", details: error.message });
        }

        // Get public URL
        console.log(supabase.storage.from("pfp").url + `/object/public/uploads/${fileName}`)
        // pfpUrl = supabase.storage.from("uploads").getPublicUrl(data.path).publicURL;
        console.log("Image uploaded successfully. URL:", pfpUrl);

        // Delete local file after upload
        fs.unlinkSync(filePath);
      } catch (fileError) {
        console.error("Error handling file:", fileError.message);
        return res.status(500).json({ error: "File handling error", details: fileError.message });
      }
    }

    // Save user in MongoDB
    const newUser = new Users({
      name,
      email,
      password,
      location,
      budget,
      programme,
      pfpUrl,
    });

    await newUser.save();
    console.log("User created successfully:", newUser);
    
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
