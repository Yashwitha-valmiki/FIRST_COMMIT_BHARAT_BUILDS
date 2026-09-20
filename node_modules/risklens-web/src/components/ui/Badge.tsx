export default function Badge({ label, color }: { label: string; color?: string }) {
  const bg =
    color === "RED" ? "#fee2e2" :
    color === "ORANGE" ? "#ffedd5" :
    color === "YELLOW" ? "#fef9c3" :
    color === "GREEN" ? "#dcfce7" : "#e5e7eb";

  const fg =
    color === "RED" ? "#991b1b" :
    color === "ORANGE" ? "#9a3412" :
    color === "YELLOW" ? "#854d0e" :
    color === "GREEN" ? "#166534" : "#374151";

  return (
    <span style={{ background: bg, color: fg, padding: "4px 10px", borderRadius: 999, fontWeight: 600, fontSize: 12 }}>
      {label}
    </span>
  );
}
