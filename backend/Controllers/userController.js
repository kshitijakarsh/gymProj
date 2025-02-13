const Users = require("../models/UserSchema");

exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, location, budget, programme, gymEnrolled = false } = req.body;

    let pfpUrl = "";
        if (req.file) {
            const uploadResult = await uploadImage(req.file.path);
            pfpUrl = uploadResult.secure_url;
        }
    
    const user = new Users({
      name,
      email,
      password,
      location,
      budget,
      programme,
      gymEnrolled,
      pfp: pfpUrl
    });

    await user.save();
    res.json({ message: "User created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
