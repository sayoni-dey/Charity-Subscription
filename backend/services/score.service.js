import Score from "../models/score.model.js";

// Add new score with rolling logic
export const addScoreService = async (userId, score, date) => {
  // 1. Create new score
  const newScore = await Score.create({
    user: userId,
    score,
    date
  });

  // 2. Fetch all scores sorted latest first
  const scores = await Score.find({ user: userId })
    .sort({ date: -1 });

  // 3. If more than 5 → delete oldest
  if (scores.length > 5) {
    const oldestScore = scores[5]; // index 5 = 6th element
    await Score.findByIdAndDelete(oldestScore._id);
  }

  return newScore;
};

export const getScoresService = async (userId) => {
  return await Score.find({ user: userId })
    .sort({ date: -1 })
    .limit(5);
};