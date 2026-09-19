"use client";
import { useEffect, useState } from "react";
import { handleAuthCallbackAndStoreToken } from "@/lib/auth";

export default function AuthCallbackPage() {
  const [msg, setMsg] = useState("Completing login...");

  useEffect(() => {
    handleAuthCallbackAndStoreToken()
      .then(() => {
        setMsg("Login successful. Redirecting...");
        setTimeout(() => (window.location.href = "/"), 700);
      })
      .catch((e) => setMsg(`Login failed: ${e.message}`));
  }, []);

  return <main style={{ padding: 24 }}><h1>{msg}</h1></main>;
}
