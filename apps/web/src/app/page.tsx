"use client";
import { useState } from "react";

export default function HomePage() {
  const [text, setText] = useState("This agreement has lock-in and penalty.");
  const [result, setResult] = useState<any>(null);

  async function analyze() {
    const res = await fetch("http://localhost:4000/documents/doc1/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, role: "student", language: "en" })
    });
    const data = await res.json();
    setResult(data);
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>RiskLens</h1>
      <textarea rows={8} style={{ width: "100%" }} value={text} onChange={(e) => setText(e.target.value)} />
      <br /><br />
      <button onClick={analyze}>Analyze</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </main>
  );
}
