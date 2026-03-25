"use client";
import { useState } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, role } = res.data;
      Cookies.set("token", res.data.token, { expires: 7 }); // Store for 7 days
      Cookies.set("role", role, { expires: 7 });
      router.push("/dashboard");
      if (role === 'admin') {
        router.push("/admin");
      } else {
      router.push("/dashboard");
}
    } catch (err) {
      alert("Login failed. Check credentials.");
    }
  };

  // Use your existing attractive UI here, just add onSubmit to the form
  return (
    <form onSubmit={handleLogin}>
      <input type="email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}