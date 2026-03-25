import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Gift, Heart, ShieldCheck, BarChart3 } from "lucide-react";
import api from "@/lib/api";

export default function AdminDashboard() {
  const runMonthlyDraw = async () => {
    if (!confirm("Are you sure you want to run the draw? This will select winners.")) return;
    try {
      const res = await api.post("/draw/run");
      alert("Draw completed successfully!");
    } catch (err) {
      alert("Unauthorized or Draw Error");
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Admin Header */}
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Control Center</h1>
          <p className="text-slate-500">Platform oversight and winner verification[cite: 109, 111].</p>
        </div>
        <div className="p-10">
          <h1 className="text-2xl font-bold mb-4">Admin Control</h1>
          <Button onClick={runMonthlyDraw} className="bg-emerald-600">
            Run Draw Simulation
          </Button>
        </div>
      </header>

      {/* Analytics Overview [cite: 113] */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Users", value: "1,240", icon: Users, color: "text-blue-600" },
          { label: "Active Prize Pool", value: "$42,500", icon: Gift, color: "text-emerald-600" },
          { label: "Charity Totals", value: "$12,840", icon: Heart, color: "text-rose-600" },
          { label: "Draw Success Rate", value: "98.2%", icon: BarChart3, color: "text-slate-600" }
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <Badge variant="secondary" className="bg-slate-100">+12%</Badge>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label} [cite: 114, 115, 116, 117]</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Winner Verification Queue [cite: 109] */}
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Pending Verifications [cite: 111]</CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "Alex Johnson", amount: "$4,500", status: "Pending" },
                { user: "Sarah Miller", amount: "$250", status: "Reviewing" }
              ].map((winner, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-xl bg-white hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold">
                      {winner.user[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{winner.user}</p>
                      <p className="text-xs text-slate-500">Won Match: 5-Number [cite: 53]</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold text-emerald-600">{winner.amount}</p>
                    <Button size="sm" className="bg-blue-600">Verify Proof [cite: 111]</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charity Management [cite: 106] */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Charity List [cite: 107]</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Water.org", "Save the Children", "Greenpeace"].map((charity) => (
                <div key={charity} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">{charity}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-400">Edit</Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-rose-400">Remove</Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4 border-dashed">+ Add New Charity [cite: 107]</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}