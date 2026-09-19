"use client";
export default function Navbar() {
  const link = (href:string, label:string) => <a href={href} style={{ marginRight: 12 }}>{label}</a>;
  return (
    <nav style={{ marginBottom: 16 }}>
      {link("/", "Home")}
      {link("/dashboard", "Dashboard")}
      {link("/login", "Login")}
      {link("/privacy", "Privacy")}
      {link("/terms", "Terms")}
      {link("/disclaimer", "Disclaimer")}
    </nav>
  );
}
