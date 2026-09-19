"use client";
import { useEffect, useState } from "react";
import SummaryCard from "@/components/dashboard/SummaryCard";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:4000/dashboard/summary")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <main style={{ padding: 24 }}>Loading dashboard...</main>;

  return (
    <main style={{ padding: 24 }}>
      <h1>RiskLens Dashboard</h1>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
        <SummaryCard title="Total Documents" value={data.totalDocuments} />
        <SummaryCard title="High Risk" value={data.highRiskCount} />
        <SummaryCard title="Moderate Risk" value={data.moderateRiskCount} />
        <SummaryCard title="Safe" value={data.safeCount} />
        <SummaryCard title="Upcoming Obligations" value={data.upcomingObligations} />
      </div>
    </main>
  );
}
