"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog"; // Ensure this matches your shadcn path
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, CheckCircle2 } from "lucide-react";

// 1. Define the interface for the props
interface WinnerProofModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 2. Apply the interface to the component
export function WinnerProofModal({ isOpen, onClose }: WinnerProofModalProps) {
  const [file, setFile] = useState<File | null>(null); // Type for the file state

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500 h-6 w-6" /> Verify Your Win
          </DialogTitle>
          <DialogDescription className="text-slate-500 pt-2">
            To claim your prize, please upload a screenshot of your scores from your golf platform for verification.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-6">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-8 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer group">
            <Upload className="h-10 w-10 text-slate-400 mb-2 group-hover:text-blue-500 transition-colors" />
            <p className="text-sm font-semibold text-slate-600">Click to upload proof</p>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-tight font-bold">PNG or JPG preferred</p>
            <Input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange} 
            />
          </label>
          
          {file && (
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded border border-blue-100">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
              <p className="text-xs text-blue-700 font-medium truncate">Selected: {file.name}</p>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-between flex gap-2">
          <Button variant="ghost" onClick={onClose} className="text-slate-500">Cancel</Button>
          <Button 
            disabled={!file} 
            className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
          >
            Submit for Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}