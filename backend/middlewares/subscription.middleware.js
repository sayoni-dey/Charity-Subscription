import Subscription from "../models/subscription.model.js";

export const requireActiveSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user._id,
      status: "active",
      endDate: { $gt: new Date() }
    });

    if (!subscription) {
      return res.status(403).json({
        message: "Active subscription required"
      });
    }

    req.subscription = subscription;
    next();

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};