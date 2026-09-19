type Props = { title: string; value: number | string };

export default function SummaryCard({ title, value }: Props) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16, minWidth: 180 }}>
      <div style={{ fontSize: 12, color: "#666" }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
