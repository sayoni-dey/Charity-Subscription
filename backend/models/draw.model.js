import mongoose from "mongoose";
const drawSchema = new mongoose.Schema({
  drawMonth: String, // "March-2026"

  numbers: [Number], // winning numbers

  type: {
    type: String,
    enum: ["random", "algorithmic"]
  },

  status: {
    type: String,
    enum: ["draft", "published"]
  },

  resultsPublishedAt: Date

}, { timestamps: true });

const Draw = mongoose.model('Draw', drawSchema);
export default Draw;