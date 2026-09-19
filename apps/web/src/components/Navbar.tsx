"use client";
export default function Navbar() {
  const link = (href: string, label: string) => (
    <a href={href} style={{ marginRight: 14, textDecoration: "none", color: "#111827", fontWeight: 600 }}>{label}</a>
  );
  return (
    <nav style={{ marginBottom: 18, paddingBottom: 10, borderBottom: "1px solid #e5e7eb" }}>
      {link("/", "Home")}
      {link("/dashboard", "Dashboard")}
      {link("/login", "Login")}
      {link("/privacy", "Privacy")}
      {link("/terms", "Terms")}
      {link("/disclaimer", "Disclaimer")}
    </nav>
  );
}
