// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://charity-subscription.onrender.com/api" || "http://localhost:5000",
});

// This interceptor ensures the token is fresh on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Ensure this matches your login key!
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;