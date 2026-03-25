import express from "express";
import { runDrawService } from "../services/draw.service.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

//Run Monthly Draw (Admin trigger for now)
router.post("/run", protect, async (req, res) => {
  try {
    const result = await runDrawService();

    res.status(200).json({
      message: "Draw executed successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error running draw",
      error: error.message,
    });
  }
});

export default router;