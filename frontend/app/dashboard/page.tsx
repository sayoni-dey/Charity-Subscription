"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Heart, Plus, Award } from "lucide-react";
import { WinnerProofModal } from "@/components/dashboard/WinnerProofModal";
import { ScoreForm } from "@/components/dashboard/ScoreForm";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// ✅ FIXED TYPES
interface Score {
  _id: string;
  score: number; // ✅ FIXED
  date: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  subscriptionStatus: string;
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const [userRes, scoresRes] = await Promise.all([
        api.get("/users/me"),
        api.get("/scores"),
      ]);

      setUser(userRes.data);
      setScores(scoresRes.data);
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-blue-600 font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10 text-slate-900">
      
      {/* HEADER */}
      <header className="mb-10 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Hello, {"Golfer"} 👋
          </h1>
          <p className="text-slate-500">
            Your play is fueling real-world impact.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-emerald-50 text-emerald-700 border-none">
            ● {user?.subscriptionStatus || "Active"}
          </Badge>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Scores
              </Button>
            </SheetTrigger>

            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle>Add Latest Scores</SheetTitle>
              </SheetHeader>

              <ScoreForm onScoreAdded={fetchDashboardData} />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* SCORE LIST */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Latest 5 Scores</CardTitle>
          </CardHeader>

          <CardContent>
            {scores.length > 0 ? (
              <div className="space-y-4">
                {scores.map((score, index) => (
                  <div
                    key={score._id}
                    className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 font-bold">
                        {index + 1}
                      </div>

                      <div>
                        {/* ✅ FIXED */}
                        <p className="font-bold text-lg">
                          {score.score} Points
                        </p>

                        <p className="text-xs text-gray-400">
                          {new Date(score.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-10">
                No scores yet. Start playing!
              </div>
            )}
          </CardContent>
        </Card>

        {/* SIDEBAR */}
        <div className="space-y-6">
          
          {/* Charity */}
          <Card className="bg-blue-600 text-white">
            <CardContent className="pt-6">
              <Heart className="mb-2" />
              <h3 className="font-bold">Water.org</h3>
              <Button className="mt-4 w-full bg-white text-blue-600">
                Change Charity
              </Button>
            </CardContent>
          </Card>

          {/* Winner */}
          <Card className="bg-emerald-50 border border-emerald-100">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-emerald-700 mb-3">
                <Award className="h-5 w-5" />
                <span className="text-xs font-bold uppercase">
                  Potential Win
                </span>
              </div>

              <Button
                onClick={() => setIsWinnerModalOpen(true)}
                className="w-full bg-emerald-600 text-white"
              >
                Verify Proof
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>

      <WinnerProofModal
        isOpen={isWinnerModalOpen}
        onClose={() => setIsWinnerModalOpen(false)}
      />
    </div>
  );
}