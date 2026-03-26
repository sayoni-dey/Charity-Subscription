"use client";

import { useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, Trophy } from "lucide-react";

interface ScoreEntry {
  points: string;
  date: string;
}

interface ScoreFormProps {
  onScoreAdded: () => void;
}

export function ScoreForm({ onScoreAdded }: ScoreFormProps) {
  const [entries, setEntries] = useState<ScoreEntry[]>(
    Array(5).fill(null).map(() => ({
      points: "",
      date: new Date().toISOString().split("T")[0],
    }))
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpdateEntry = (index: number, field: keyof ScoreEntry, value: string) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validScores = entries.filter((entry) => entry.points.trim() !== "");

    if (validScores.length === 0) {
      alert("Please enter at least one score.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 🔥 IMPORTANT FIX: send one-by-one with correct field
      for (const entry of validScores) {
        await api.post("/scores", {
          value: Number(entry.points), // ✅ FIXED (was points)
          date: entry.date,
        });
      }

      setIsSuccess(true);

      setTimeout(() => {
        onScoreAdded();
        setIsSuccess(false);

        setEntries(
          Array(5).fill(null).map(() => ({
            points: "",
            date: new Date().toISOString().split("T")[0],
          }))
        );
      }, 1200);
    } catch (err: any) {
      console.error("Upload error:", err);
      alert("Failed to sync scores");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in">
        <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-4" />
        <h3 className="text-xl font-bold">Scores Synced Successfully!</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-150px)]">
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4 shrink-0">
        <div className="flex items-center gap-2 text-blue-600 mb-1">
          <Trophy className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700">
            Detailed Entry
          </span>
        </div>
        <p className="text-[11px] text-slate-500">
          Log your Stableford points and the date of play.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 pb-6">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="p-3 border border-slate-100 rounded-xl bg-white shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Round #{index + 1}
                </span>
                {entry.points && (
                  <span className="text-[10px] text-blue-500 font-bold">READY</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-[9px] font-bold text-slate-400 ml-1">
                    POINTS
                  </Label>
                  <Input
                    type="number"
                    value={entry.points}
                    onChange={(e) =>
                      handleUpdateEntry(index, "points", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-[9px] font-bold text-slate-400 ml-1">
                    DATE
                  </Label>
                  <Input
                    type="date"
                    value={entry.date}
                    onChange={(e) =>
                      handleUpdateEntry(index, "date", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-100 shrink-0 bg-white">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              "Submit All Entries"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}