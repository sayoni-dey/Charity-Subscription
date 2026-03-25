import mongoose from "mongoose";
const prizePoolSchema = new mongoose.Schema({
  draw: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Draw"
  },

  totalPool: Number,

  distribution: {
    fiveMatch: Number,  // 40%
    fourMatch: Number,  // 35%
    threeMatch: Number  // 25%
  }

}, { timestamps: true });

module.exports = mongoose.model('Prize', charitySchema);

