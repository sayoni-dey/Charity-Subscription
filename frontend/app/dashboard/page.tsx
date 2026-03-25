"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Heart, Calendar, ArrowUpRight, Plus, Award, User as UserIcon } from "lucide-react";
import { WinnerProofModal } from "@/components/dashboard/WinnerProofModal";
import { ScoreForm } from "@/components/dashboard/ScoreForm"; // Import the form
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// --- TYPESCRIPT INTERFACES ---
interface Score {
  _id: string;
  points: number;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  subscriptionStatus: string;
}

export default function UserDashboard() {
  // State with proper Types instead of any[]
  const [user, setUser] = useState<User | null>(null);
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);

  // Function to fetch data (defined separately so we can refresh after adding a score)
  const fetchDashboardData = async () => {
    try {
      const [userRes, scoresRes] = await Promise.all([
        api.get("/users/me"),
        api.get("/scores")
      ]);
      setUser(userRes.data);
      setScores(scoresRes.data);
    } catch (err) {
      console.error("Session expired or server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center bg-white text-blue-600 font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10 text-slate-900">
      <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          {/* DISPLAYING CURRENT USER NAME */}
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Hello, {user?.name || "Golfer"} <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-slate-500 font-medium tracking-tight">Your play is directly fueling positive global change.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-white px-3 py-1 text-emerald-600 border-emerald-100 shadow-sm uppercase text-[10px] font-bold">
            ● {user?.subscriptionStatus || "Active"}
          </Badge>

          {/* INTEGRATING SCOREFORM.TSX HERE */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
              <Plus className="mr-2 h-4 w-4" /> Sync 5 Scores
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader className="mb-6">
                <SheetTitle>Add Latest Score</SheetTitle>
              </SheetHeader>
              <ScoreForm onScoreAdded={fetchDashboardData} />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* SCORE LIST SECTION */}
        <Card className="lg:col-span-2 border-none shadow-sm ring-1 ring-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4 mb-4">
            <CardTitle className="text-xl font-semibold">Rolling Score History</CardTitle>
            <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold text-[10px]">LATEST 5</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scores.length > 0 ? (
                scores.map((score, index) => (
                  <div key={score._id} className="flex items-center justify-between rounded-xl border border-slate-100 p-4 hover:border-blue-200 hover:shadow-md transition-all group bg-white">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-bold text-lg">{score.points} Points</p>
                        <p className="text-xs text-slate-400">
                          {new Date(score.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-slate-300 hover:text-blue-600">Edit</Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-400 italic">No scores logged yet. Start playing!</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* SIDEBAR CARDS (Charity, Wins, etc.) */}
        <div className="space-y-6">
          <Card className="border-none bg-blue-600 text-white shadow-xl shadow-blue-100">
            <CardContent className="pt-8">
              <Heart className="h-6 w-6 text-blue-200 mb-4" />
              <h3 className="text-lg font-bold">Water.org</h3>
              <Progress value={45} className="h-2 bg-blue-400 my-4" />
              <Button variant="secondary" className="w-full bg-white text-blue-600 font-bold">Change Charity</Button>
            </CardContent>
          </Card>

          {/* Winner Trigger */}
          <Card className="border-none bg-emerald-50 border-emerald-100 border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4 text-emerald-700">
                <Award className="h-5 w-5" />
                <h3 className="font-bold uppercase text-xs tracking-wider">Potential Win Detected</h3>
              </div>
              <Button onClick={() => setIsWinnerModalOpen(true)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                Verify Proof
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <WinnerProofModal isOpen={isWinnerModalOpen} onClose={() => setIsWinnerModalOpen(false)} />
    </div>
  );
}