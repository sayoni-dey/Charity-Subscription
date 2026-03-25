import { runDrawService } from "../services/draw.service.js";

export const runDraw = async (req, res) => {
  try {
    const draw = await runDrawService();

    res.json({
      message: "Draw executed successfully",
      draw
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};