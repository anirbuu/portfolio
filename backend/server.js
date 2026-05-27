const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ADMIN STATIC FILES =================
app.use(
  "/admin",
  express.static(path.join(__dirname, "admin"))
);

// ================= DATABASE CONNECTION =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Portfolio backend is running!");
});

// ================= ROUTES =================
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);

// ================= SERVER START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});