"use client";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { logout, whoAmI } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function HomePage() {
  const [text, setText] = useState("Agreement includes lock-in and penalty.");
  const [result, setResult] = useState<any>(null);
  const [docId] = useState("doc_" + Date.now());
  const [userInfo, setUserInfo] = useState<string>("");

  async function me() {
    const u = await whoAmI();
    setUserInfo(JSON.stringify(u, null, 2));
  }

  async function analyzeText() {
    const data = await apiFetch(`/documents/${docId}/analyze`, {
      method: "POST",
      body: JSON.stringify({ text, role: "student", language: "en" })
    });
    setResult(data);
  }

  async function exportPdf() {
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/documents/${docId}/report.pdf`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("id_token") || ""}` }
    });
    if (!r.ok) return alert("PDF export failed");
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${docId}-risk-report.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto", background: "#f9fafb", minHeight: "100vh" }}>
      <Navbar />
      <h1 style={{ marginTop: 0 }}>RiskLens</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
        <Card title="Session">
          <div style={{ display: "flex", gap: 8 }}>
            <a href="/login"><button>Login</button></a>
            <button onClick={me}>Who am I</button>
            <button onClick={logout}>Logout</button>
          </div>
          {userInfo && <pre style={{ marginTop: 10 }}>{userInfo}</pre>}
        </Card>

        <Card title="Analyze Document Text">
          <textarea rows={8} style={{ width: "100%" }} value={text} onChange={(e) => setText(e.target.value)} />
          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
            <button onClick={analyzeText}>Analyze</button>
            <button onClick={exportPdf}>Export PDF</button>
          </div>
        </Card>

        {result && (
          <Card title="Analysis Result">
            <div style={{ marginBottom: 8 }}>
              <Badge label={result?.decision?.label || "UNKNOWN"} color={result?.decision?.color} />
              <span style={{ marginLeft: 10 }}>Score: {result?.decision?.overallRiskScore}</span>
            </div>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </Card>
        )}
      </div>
    </main>
  );
}
