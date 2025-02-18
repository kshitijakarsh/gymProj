import { customAlphabet } from "nanoid";
import mongoose from "mongoose";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 12);

const UserSchema = new mongoose.Schema({
    userId: { type: String, unique: true, default: () => nanoid() },
    name: String,
    email: String,
    password: String,
    location: String,
    budget: String,
    programme: String,
    pfpUrl: String,
    gymEnrolled: { type: Boolean, default: false },
    gymDashboard: { type: mongoose.Schema.Types.ObjectId, ref: "GymDashboard" },
});

const Users = mongoose.model("User", UserSchema);

export default Users;