"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, UserPlus, MoreVertical } from "lucide-react";

export default function UsersManagement() {
  const users = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", status: "Active", joined: "Mar 12, 2026" },
    { id: 2, name: "Sarah Miller", email: "sarah.m@test.com", status: "Pending", joined: "Mar 15, 2026" },
    { id: 3, name: "Michael Ross", email: "m.ross@firm.com", status: "Active", joined: "Feb 20, 2026" },
    { id: 4, name: "Emma Wilson", email: "emma.w@golf.org", status: "Suspended", joined: "Jan 05, 2026" },
  ];

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-slate-500">View and manage all registered subscribers.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" /> Add New User
        </Button>
      </header>

      <Card className="border-none shadow-sm ring-1 ring-slate-200">
        <CardHeader className="border-b border-slate-50 pb-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search users by name or email..." className="pl-10 bg-slate-50 border-none" />
            </div>
            <Button variant="outline">Filters</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 font-medium border-b border-slate-100">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className={
                      user.status === "Active" ? "bg-emerald-50 text-emerald-700" : 
                      user.status === "Suspended" ? "bg-rose-50 text-rose-700" : "bg-orange-50 text-orange-700"
                    }>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{user.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm"><MoreVertical className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}