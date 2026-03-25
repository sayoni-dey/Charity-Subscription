"use client";
import { useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, PlusCircle } from "lucide-react";

interface ScoreFormProps {
  onScoreAdded: () => void;
}

export function ScoreForm({ onScoreAdded }: ScoreFormProps) {
  // Initialize with 5 empty strings
  const [pointsArray, setPointsArray] = useState<string[]>(["", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    const newPoints = [...pointsArray];
    newPoints[index] = value;
    setPointsArray(newPoints);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty inputs and convert to numbers
    const validScores = pointsArray
      .filter(p => p.trim() !== "")
      .map(p => Number(p));

    if (validScores.length === 0) {
      alert("Please enter at least one score.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Sending the array to your POST /api/scores endpoint
      // Your backend should handle looping through this array
      await api.post("/scores/bulk", { scores: validScores });
      
      setPointsArray(["", "", "", "", ""]);
      onScoreAdded(); // Refresh dashboard data
    } catch (err) {
      alert("Error adding scores. Ensure your subscription is active.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <PlusCircle className="h-4 w-4 text-blue-600" />
          <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Enter up to 5 Scores
          </Label>
        </div>
        
        {pointsArray.map((points, index) => (
          <div key={index} className="relative">
            <span className="absolute left-3 top-3 text-xs font-bold text-slate-300">
              #{index + 1}
            </span>
            <Input 
              type="number" 
              placeholder="Stableford Points" 
              value={points} 
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="h-12 pl-10 border-slate-200 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
            />
          </div>
        ))}
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg font-bold shadow-lg shadow-blue-100 rounded-xl transition-all active:scale-95"
      >
        {isSubmitting ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          "Update My Scoreboard"
        )}
      </Button>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <p className="text-[11px] text-blue-700 leading-relaxed text-center font-medium">
          Note: Your profile only stores your 5 most recent entries. 
          New scores will automatically rotate out older ones to keep your handicap current.
        </p>
      </div>
    </form>
  );
}