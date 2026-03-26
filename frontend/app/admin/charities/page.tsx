"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Plus, ExternalLink, Trash2 } from "lucide-react";

export default function CharitiesManagement() {
  const charities = [
    { name: "Water.org", totalRaised: "$4,250", projects: 12, status: "Active" },
    { name: "Greenpeace", totalRaised: "$3,100", projects: 8, status: "Active" },
    { name: "Save the Children", totalRaised: "$5,490", projects: 21, status: "Inactive" },
  ];

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Charity Partners</h1>
          <p className="text-slate-500">Manage organizations and track donation distribution.</p>
        </div>
        <Button className="bg-rose-600 hover:bg-rose-700 text-white">
          <Plus className="h-4 w-4 mr-2" /> Register Charity
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {charities.map((charity) => (
          <Card key={charity.name} className="border-none shadow-sm ring-1 ring-slate-200 hover:ring-rose-200 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">{charity.name}</CardTitle>
              <Heart className={`h-5 w-5 ${charity.status === 'Active' ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`} />
            </CardHeader>
            <CardContent>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total Contributions</span>
                  <span className="font-bold text-slate-900">{charity.totalRaised}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Active Projects</span>
                  <span className="font-bold text-slate-900">{charity.projects}</span>
                </div>
                <div className="pt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="h-3 w-3 mr-2" /> Details
                  </Button>
                  <Button variant="outline" size="sm" className="text-rose-600 hover:bg-rose-50 border-rose-100">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Add New Empty State Card */}
        <button className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
          <div className="p-3 rounded-full bg-slate-50 group-hover:bg-blue-100 mb-3 transition-colors">
            <Plus className="h-6 w-6" />
          </div>
          <span className="font-semibold text-sm">Add New Organization</span>
        </button>
      </div>
    </div>
  );
}