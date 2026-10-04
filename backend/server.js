import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import historyRoutes from "./routes/historyRoutes.js";
import musicRoutes from "./routes/musicRoutes.js";
import favoritesRoutes from "./routes/favoritesRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Music Player API is running",
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error");
    console.error(error.message);
  });

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Music Player API is running",
  });
});

// Routes
app.use("/api/history", historyRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/favorites", favoritesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});