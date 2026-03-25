import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  plan: {
    type: String,
    enum: ["monthly", "yearly"]
  },

  status: {
    type: String,
    enum: ["active", "inactive", "cancelled"]
  },

  razorpaySubscriptionId: {type: String} ,
  plan: {type: String} ,

  startDate: Date,
  endDate: Date,

  paymentId: String, // RazorPay reference

}, { timestamps: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;