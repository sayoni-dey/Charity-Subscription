"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Gift, Heart, BarChart3, Trophy, Sparkles } from "lucide-react";
import api from "@/lib/api";

interface DrawData {
  drawMonth: string;
  numbers: number[];
  status: string;
  _id: string;
}

export default function AdminDashboard() {
  const [latestDraw, setLatestDraw] = useState<DrawData | null>(null);
  const [loading, setLoading] = useState(false);

  const runMonthlyDraw = async () => {
    if (!confirm("Are you sure you want to run the draw? This will select new winning numbers.")) return;
    
    setLoading(true);
    try {
      const res = await api.post("/draw/run");
      // Assuming res.data matches the structure you provided
      setLatestDraw(res.data.data);
      alert("Draw executed successfully!");
    } catch (err) {
      alert("Error running draw: " + (err instanceof Error ? err.message : "Unauthorized"));
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: "Total Users", value: "1,240", icon: Users, color: "text-blue-600" },
    { label: "Prize Pool", value: "$42,500", icon: Gift, color: "text-emerald-600" },
    { label: "Charity", value: "$12,840", icon: Heart, color: "text-rose-600" },
    { label: "Success Rate", value: "98.2%", icon: BarChart3, color: "text-slate-600" }
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Metrics</h1>
          <p className="text-slate-500">Real-time platform oversight and draw control.</p>
        </div>
        <Button 
          onClick={runMonthlyDraw} 
          disabled={loading}
          size="lg" 
          className="bg-emerald-600 hover:bg-emerald-700 font-bold px-8 shadow-lg shadow-emerald-900/10 transition-all active:scale-95"
        >
          {loading ? "Processing..." : "Run Draw Simulation"}
        </Button>
      </header>

      {/* WINNER NUMBERS DISPLAY - Only shows after a successful draw */}
      {latestDraw && (
        <Card className="border-none shadow-md bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <CardContent className="p-8 relative">
            <Sparkles className="absolute right-4 top-4 h-12 w-12 text-white/10" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  <span className="font-bold uppercase tracking-widest text-sm text-blue-100">
                    Latest Draw Result: {latestDraw.drawMonth}
                  </span>
                </div>
                <h2 className="text-2xl font-bold">Winning Numbers Generated</h2>
                <p className="text-blue-100 text-sm mt-1 underline underline-offset-4 cursor-pointer">
                  ID: {latestDraw._id} • Status: {latestDraw.status}
                </p>
              </div>
              
              <div className="flex gap-3">
                {latestDraw.numbers.map((num, idx) => (
                  <div 
                    key={idx} 
                    className="h-14 w-14 rounded-full bg-white text-blue-700 flex items-center justify-center text-xl font-black shadow-xl ring-4 ring-white/20 transform hover:scale-110 transition-transform"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm ring-1 ring-slate-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <Badge className="bg-emerald-50 text-emerald-700 border-none">+12%</Badge>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        {/* Verification List */}
        <Card className="lg:col-span-2 border-none shadow-sm ring-1 ring-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Winner Verification Queue</CardTitle>
            <Button variant="link" className="text-blue-600 font-semibold">View All</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Alex Johnson", "Sarah Miller"].map((user, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 transition-hover hover:bg-slate-100/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white border flex items-center justify-center font-bold text-slate-600 shadow-sm">
                    {user[0]}
                  </div>
                  <span className="font-semibold text-slate-700">{user}</span>
                </div>
                <Button size="sm" variant="outline" className="bg-white hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  Verify Proof
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Charity List */}
        <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Active Charities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Water.org", "Greenpeace"].map((c) => (
              <div key={c} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center text-sm font-medium border border-transparent hover:border-slate-200">
                {c}
                <Button variant="ghost" size="sm" className="h-7 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                  Delete
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full border-dashed mt-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50/50">
              + Add New Charity
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}