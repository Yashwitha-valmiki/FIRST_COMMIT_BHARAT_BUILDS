"use client";
import { loginHostedUI } from "@/lib/auth";

export default function LoginPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Login</h1>
      <p>Use Cognito Hosted UI to authenticate.</p>
      <button onClick={() => loginHostedUI()}>Continue with Cognito</button>
    </main>
  );
}
