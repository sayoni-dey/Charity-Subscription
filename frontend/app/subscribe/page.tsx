"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Trophy, Crown, Star } from "lucide-react";
import api from "@/lib/api";

const plans = [
  {
    id: "basic",
    name: "Starter Birdie",
    price: "£9.99",
    description: "Perfect for casual players.",
    features: ["Standard 5-Score Draw", "Basic Charity Impact", "Monthly Results"],
    icon: Star,
    color: "text-slate-600",
  },
  {
    id: "pro",
    name: "Pro Eagle",
    price: "£19.99",
    description: "Most popular for regular golfers.",
    features: ["Double Jackpot Entry", "Custom Charity Selection", "Performance Analytics", "Priority Verification"],
    icon: Trophy,
    color: "text-blue-600",
    popular: true,
  },
  {
    id: "elite",
    name: "Elite Albatross",
    price: "£39.99",
    description: "For the ultimate philanthropists.",
    features: ["Triple Jackpot Entry", "VIP Charity Events", "Ad-free Dashboard", "Dedicated Support"],
    icon: Crown,
    color: "text-emerald-600",
  },
];

export default function SubscriptionPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleSelectPlan = async (planId: string) => {
    setLoading(planId);
    try {
      // Backend: PATCH /api/users/subscribe or similar
      await api.patch("/users/subscribe", { plan: planId });
      router.push("/dashboard");
    } catch (err) {
      // For demo purposes, we move to dashboard even if backend fails
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Choose Your Impact</h1>
        <p className="text-lg text-slate-500">Select a subscription plan to activate your 5-score dashboard.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative border-none shadow-xl transition-all hover:scale-105 ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Most Popular
              </div>
            )}
            <CardHeader className="text-center pt-8">
              <plan.icon className={`h-12 w-12 mx-auto mb-4 ${plan.color}`} />
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <div className="text-3xl font-black mt-2 text-slate-900">
                {plan.price}<span className="text-sm text-slate-400 font-medium">/mo</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-500 text-center">{plan.description}</p>
              <div className="space-y-2">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSelectPlan(plan.id)}
                disabled={loading !== null}
                className={`w-full h-12 text-lg font-bold rounded-xl ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-black'}`}
              >
                {loading === plan.id ? "Activating..." : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}