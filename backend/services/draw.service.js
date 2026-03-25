import User from "../models/user.model.js";
import Score from "../models/score.model.js";
import Winner from "../models/winner.model.js";
import Draw from "../models/draw.model.js";

export const generateRandomDraw = () => {
  const numbers = [];

  while (numbers.length < 5) {
    const num = Math.floor(Math.random() * 45) + 1;

    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  return numbers;
};

export const countMatches = (userScores, drawNumbers) => {
  let matchCount = 0;

  for (let score of userScores) {
    if (drawNumbers.includes(score)) {
      matchCount++;
    }
  }

  return matchCount;
};

export const runDrawService = async () => {

  // 1. Generate draw numbers
  const drawNumbers = generateRandomDraw();

  // 2. Create draw entry
  const draw = await Draw.create({
    drawMonth: "March-2026",
    numbers: drawNumbers,
    type: "random",
    status: "draft"
  });

  // 3. Get all active users
  const users = await User.find();

  for (let user of users) {

    // get latest 5 scores
    const scores = await Score.find({ user: user._id })
      .sort({ date: -1 })
      .limit(5);

    if (scores.length < 5) continue;

    const scoreValues = scores.map(s => s.score);

    const matches = countMatches(scoreValues, drawNumbers);

    let matchType = null;

    if (matches === 5) matchType = "5-match";
    else if (matches === 4) matchType = "4-match";
    else if (matches === 3) matchType = "3-match";

    if (matchType) {
      await Winner.create({
        user: user._id,
        draw: draw._id,
        matchType,
        prizeAmount: 0, // calculated later
        status: "pending"
      });
    }
  }

  return draw;
};

export const distributePrizes = async (drawId, totalPool) => {

  const winners = await Winner.find({ draw: drawId });

  const tiers = {
    "5-match": [],
    "4-match": [],
    "3-match": []
  };

  winners.forEach(w => {
    tiers[w.matchType].push(w);
  });

  const distribution = {
    "5-match": 0.4 * totalPool,
    "4-match": 0.35 * totalPool,
    "3-match": 0.25 * totalPool
  };

  for (let tier in tiers) {
    const users = tiers[tier];

    if (users.length === 0) continue;

    const prizeEach = distribution[tier] / users.length;

    for (let winner of users) {
      winner.prizeAmount = prizeEach;
      await winner.save();
    }
  }
};