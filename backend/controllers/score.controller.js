import {
  addScoreService,
  getScoresService
} from "../services/score.service.js";

export const addScore = async (req, res) => {
  try {
    const { scores } = req.body;

    // Validate array
    if (!scores || !Array.isArray(scores) || scores.length === 0) {
      return res.status(400).json({
        message: "Scores must be a non-empty array"
      });
    }

    const savedScores = [];

    for (let s of scores) {
      const { score, date } = s;

      //Validation per score
      if (!score || score < 1 || score > 45) {
        return res.status(400).json({
          message: "Each score must be between 1 and 45"
        });
      }

      if (!date) {
        return res.status(400).json({
          message: "Each score must have a date"
        });
      }

      //Call your existing service
      const newScore = await addScoreService(
        req.user._id,
        score,
        date
      );

      savedScores.push(newScore);
    }

    res.status(201).json(savedScores);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getScores = async (req, res) => {
  try {
    const scores = await getScoresService(req.user._id);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};