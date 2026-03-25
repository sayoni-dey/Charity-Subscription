import express from "express";
import { createSubscription } from "../controllers/payment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-subscription", protect, createSubscription);

export default router;