"use client";
import { getAccessToken } from "./auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = await getAccessToken();
  if (!token) throw new Error("Not authenticated. Please login.");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...(options.headers || {})
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API ${res.status}: ${txt}`);
  }
  return res.json();
}
