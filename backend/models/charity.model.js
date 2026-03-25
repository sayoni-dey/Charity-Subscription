import mongoose from "mongoose";
const charitySchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,

  totalDonations: {
    type: Number,
    default: 0
  },

  isFeatured: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model('Charity', charitySchema);