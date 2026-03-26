// app/admin/layout.tsx
"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Heart, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR: Fixed width of 256px (w-64) */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-[#0f172a] text-white z-50">
        <div className="flex h-20 items-center px-6 border-b border-slate-800">
          <ShieldCheck className="mr-3 h-6 w-6 text-blue-400" />
          <span className="font-bold text-xl tracking-tight">Admin Panel</span>
        </div>
        <nav className="p-4 space-y-2 mt-4">
          {[
            { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
            { label: "Users", icon: Users, href: "/admin/users" },
            { label: "Charities", icon: Heart, href: "/admin/charities" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 rounded-xl transition-all duration-200",
                pathname === item.href 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT: Explicit margin-left to match sidebar width */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="p-10 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}