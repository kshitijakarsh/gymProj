const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const gymRoutes = require("./routes/gymRoutes")

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/");

app.use("/api/users", userRoutes);
app.use("/api/gyms", gymRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
