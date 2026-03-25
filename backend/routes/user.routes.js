import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import User from "../models/user.model.js";

const router = express.Router();

// Get Current User
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;