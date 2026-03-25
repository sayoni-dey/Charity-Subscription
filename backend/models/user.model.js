import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription"
  },

  charity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Charity"
  },

  charityPercentage: {
    type: Number,
    default: 10
  }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;