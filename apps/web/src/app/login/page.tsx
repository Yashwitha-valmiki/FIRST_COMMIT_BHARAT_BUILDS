"use client";
import { useState } from "react";
import { loginWithCognito } from "@/lib/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    await loginWithCognito({ username, password });
    alert("Logged in (demo token stored). Replace with real Cognito flow.");
    window.location.href = "/";
  }

  return (
    <main style={{ padding: 24, maxWidth: 420 }}>
      <h1>Login</h1>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", marginBottom: 12 }} />
      <button onClick={submit}>Sign in</button>
    </main>
  );
}
