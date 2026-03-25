import Subscription from "../models/subscription.model.js";

export const handleWebhook = async (req, res) => {
  const event = req.body;

  if (event.event === "subscription.cancelled") {
    const subId = event.payload.subscription.entity.id;

    await Subscription.findOneAndUpdate(
      { razorpaySubscriptionId: subId },
      { status: "inactive" }
    );
  }

  res.json({ status: "ok" });
};