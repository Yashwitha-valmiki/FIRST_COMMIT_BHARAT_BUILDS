"use client";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("Agreement includes lock-in and penalty.");
  const [result, setResult] = useState<any>(null);
  const [docId, setDocId] = useState("doc_" + Date.now());

  async function uploadFlow() {
    if (!file) return alert("Select file first");

    const { uploadUrl, key } = await apiFetch("/documents/upload-url", {
      method: "POST",
      body: JSON.stringify({ fileName: file.name, contentType: file.type || "application/octet-stream" })
    });

    await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type || "application/octet-stream" },
      body: file
    });

    await apiFetch("/documents", {
      method: "POST",
      body: JSON.stringify({
        documentId: docId,
        key,
        fileName: file.name,
        contentType: file.type || "application/octet-stream"
      })
    });

    alert("Uploaded and document created");
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
      <h1>RiskLens</h1>

      <h3>1) Upload Document</h3>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={uploadFlow} style={{ marginLeft: 12 }}>Upload</button>

      <h3 style={{ marginTop: 20 }}>2) Analyze Text (demo path)</h3>
      <textarea rows={8} style={{ width: "100%" }} value={text} onChange={(e) => setText(e.target.value)} />
      <br /><br />
      <button onClick={analyzeText}>Analyze</button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </main>
  );
}
