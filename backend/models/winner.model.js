import mongoose from "mongoose";
const winnerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  draw: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Draw"
  },

  matchType: {
    type: String,
    enum: ["3-match", "4-match", "5-match"]
  },

  prizeAmount: Number,

  proofImage: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "paid"]
  }

}, { timestamps: true });

const Winner = mongoose.model('Winner', winnerSchema);
export default Winner;