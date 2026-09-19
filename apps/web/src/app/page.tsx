"use client";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { logout, whoAmI } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const [text, setText] = useState("Agreement includes lock-in and penalty.");
  const [result, setResult] = useState<any>(null);
  const [docId] = useState("doc_" + Date.now());
  const [userInfo, setUserInfo] = useState<string>("");

  async function me() {
    const u = await whoAmI();
    setUserInfo(JSON.stringify(u));
  }

  async function analyzeText() {
    const data = await apiFetch(`/documents/${docId}/analyze`, {
      method: "POST",
      body: JSON.stringify({ text, role: "student", language: "en" })
    });
    setResult(data);
  }

  return (
    <main style={{ padding: 24 }}>
      <Navbar />
      <h1>RiskLens</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <a href="/login"><button>Login</button></a>
        <button onClick={me}>Who am I</button>
        <button onClick={logout}>Logout</button>
      </div>
      {userInfo && <pre>{userInfo}</pre>}

      <h3>Analyze</h3>
      <textarea rows={8} style={{ width: "100%" }} value={text} onChange={(e) => setText(e.target.value)} />
      <br /><br />
      <button onClick={analyzeText}>Analyze</button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </main>
  );
}
