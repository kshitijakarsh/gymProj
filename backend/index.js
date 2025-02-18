const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const gymRoutes = require("./routes/gymRoutes");
const gymDashboardRoutes = require("./routes/gymDashboardRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

const DB = process.env.MONGO_URL;
app.use(express.json());
app.use(cors());

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("Db connected successfully");
  })
  .catch((err) => {
    console.log(`Error while connecting to database: ${err}`);
  });

app.use("/api/users", userRoutes);
app.use("/api/gyms", gymRoutes);
app.use("/api/gym-dashboard", gymDashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
