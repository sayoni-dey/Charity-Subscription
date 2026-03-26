"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck } from "lucide-react";

export default function AdminAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your auth logic here (e.g., api.post("/admin/login"))
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
          <CardDescription>
            {isLogin ? "Enter credentials to access the hub" : "Create a new administrative account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Input type="text" placeholder="Full Name" required />
              </div>
            )}
            <div className="space-y-2">
              <Input type="email" placeholder="admin@platform.com" required />
            </div>
            <div className="space-y-2">
              <Input type="password" placeholder="Password" required />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg">
              {isLogin ? "Sign In" : "Register Admin"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
            >
              {isLogin ? "Need a new account? Register" : "Already have an account? Login"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}