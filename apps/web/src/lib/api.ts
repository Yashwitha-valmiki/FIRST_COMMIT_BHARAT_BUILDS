const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("demo_token") || "demo-valid-token-123456";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...(options.headers || {})
  };
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}
