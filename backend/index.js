// index.js

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.routes.js";
import scoreRoutes from "./routes/score.routes.js";
import drawRoutes from "./routes/draw.routes.js";
import userRoutes from "./routes/user.routes.js";

// Load env variables
dotenv.config();

// App init
const app = express();

// Middleware
app.use(cors({
  origin: "*", // Your Next.js URL
  credentials: true 
}));
app.use(express.json());
app.use("/api/draw", drawRoutes);
app.use("/api/users", userRoutes);

// DB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB Error:", error.message);
    process.exit(1);
  }
};

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);

// Start server
const PORT = 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🔥 Server running on port ${PORT}`);
});