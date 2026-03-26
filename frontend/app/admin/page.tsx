"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck } from "lucide-react";
import api from "@/lib/api";

export default function AdminAuth() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // 🔐 LOGIN
        const res = await api.post("/auth/login", {
          email,
          password,
        });

        localStorage.setItem("token", res.data.token);
        router.push("/admin/dashboard");

      } else {
        // 🆕 REGISTER (optional)
        await api.post("/auth/register", {
          name,
          email,
          password,
        });

        alert("Admin registered successfully! Please login.");
        setIsLogin(true);
      }

    } catch (err: any) {
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-xl">
        
        {/* Header */}
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
          </div>

          <CardTitle className="text-2xl font-bold">
            Admin Portal
          </CardTitle>

          <CardDescription>
            {isLogin
              ? "Enter credentials to access the hub"
              : "Create a new administrative account"}
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {!isLogin && (
              <Input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <Input
              type="email"
              placeholder="admin@platform.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg"
            >
              {loading
                ? "Processing..."
                : isLogin
                ? "Sign In"
                : "Register Admin"}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
            >
              {isLogin
                ? "Need a new account? Register"
                : "Already have an account? Login"}
            </button>
          </div>
        </CardContent>

      </Card>
    </div>
  );
}