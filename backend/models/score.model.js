import mongoose from "mongoose";
const scoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  score: {
    type: Number,
    min: 1,
    max: 45
  },

  date: Date

}, { timestamps: true });

const Score = mongoose.model('Score', scoreSchema);
export default Score;