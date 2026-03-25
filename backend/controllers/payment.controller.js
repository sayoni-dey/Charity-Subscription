import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res) => {
  try {
    const { plan } = req.body;

    const planId =
      plan === "monthly"
        ? process.env.RAZORPAY_PLAN_MONTHLY
        : process.env.RAZORPAY_PLAN_YEARLY;

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12, // months (or 1 for yearly)
      notes: {
        userId: req.user._id.toString(),
      },
    });

    res.json({
      subscriptionId: subscription.id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Razorpay error" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_payment_id + "|" + razorpay_subscription_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment" });
    }

    // Payment verified → activate subscription
    await Subscription.create({
      user: req.user._id,
      status: "active",
      plan: "monthly",
      razorpaySubscriptionId: razorpay_subscription_id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
};