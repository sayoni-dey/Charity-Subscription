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
  const createEmptyEntries = () =>
    Array(5).fill(null).map(() => ({
      points: "",
      date: new Date().toISOString().split("T")[0],
    }));

  const [entries, setEntries] = useState<ScoreEntry[]>(createEmptyEntries());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpdateEntry = (
    index: number,
    field: keyof ScoreEntry,
    value: string
  ) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const validScores = entries
    .filter((entry) => entry.points.trim() !== "")
    .map((entry) => ({
      score: Number(entry.points),
      date: entry.date,
    }));

  if (validScores.length === 0) {
    alert("Please enter at least one score.");
    return;
  }

  setIsSubmitting(true);

  try {
    await api.post("/scores", {
      scores: validScores, // ✅ THIS IS THE KEY FIX
    });

    setIsSuccess(true);

    setTimeout(() => {
      onScoreAdded();
      setEntries(
        Array(5).fill(null).map(() => ({
          points: "",
          date: new Date().toISOString().split("T")[0],
        }))
      );
      setIsSuccess(false);
    }, 1200);

  } catch (err: any) {
    console.error("Upload error:", err?.response?.data);
    alert(err?.response?.data?.message || "Failed to sync scores");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="flex flex-col h-[calc(100vh-150px)]">
      
      {/* Header */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
        <div className="flex items-center gap-2 text-blue-600 mb-1">
          <Trophy className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Detailed Entry
          </span>
        </div>
        <p className="text-[11px] text-slate-500">
          Enter your latest golf scores (1–45).
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        
        <div className="flex-1 overflow-y-auto space-y-6 pb-6">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="p-3 border rounded-xl bg-white shadow-sm space-y-3"
            >
              <div className="flex justify-between text-xs text-slate-400 font-bold">
                <span>Round #{index + 1}</span>
                {entry.points && <span className="text-blue-500">READY</span>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                
                <div>
                  <Label className="text-[10px] text-slate-400">POINTS</Label>
                  <Input
                    type="number"
                    min="1"
                    max="45"
                    value={entry.points}
                    onChange={(e) =>
                      handleUpdateEntry(index, "points", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label className="text-[10px] text-slate-400">DATE</Label>
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

        {/* Submit */}
        <div className="pt-4 border-t bg-white">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              "Submit Scores"
            )}
          </Button>
        </div>

      </form>
    </div>
  );
}