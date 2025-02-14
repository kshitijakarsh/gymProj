const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    location: String,
    budget: String,
    programme: String,
    pfpUrl: String,
    gymEnrolled: { type: Boolean, default: false },
    
});

const Users = mongoose.model("User", UserSchema);

module.exports = Users;
