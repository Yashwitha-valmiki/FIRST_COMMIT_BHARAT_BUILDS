"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";

function Box({ t, v }: { t: string; v: number }) {
  return <Card><div style={{fontSize:12,color:"#6b7280"}}>{t}</div><div style={{fontSize:28,fontWeight:700}}>{v}</div></Card>;
}

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000"}/dashboard/summary`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("id_token") || ""}` }
    }).then(r => r.json()).then(setData).catch(console.error);
  }, []);

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto", background: "#f9fafb", minHeight: "100vh" }}>
      <Navbar />
      <h1>Dashboard</h1>
      {!data ? <p>Loading...</p> : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, minmax(0,1fr))", gap: 12 }}>
          <Box t="Total Documents" v={data.totalDocuments} />
          <Box t="High Risk" v={data.highRiskCount} />
          <Box t="Moderate Risk" v={data.moderateRiskCount} />
          <Box t="Safe" v={data.safeCount} />
          <Box t="Upcoming Obligations" v={data.upcomingObligations} />
        </div>
      )}
    </main>
  );
}
