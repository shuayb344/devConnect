"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });
    // Always show the same success message, whether or not the email
    // exists — same timing-attack principle as the un-awaited send:
    // don't let the response reveal which emails are registered.
    setSubmitted(true);
  }

  if (submitted) {
    return <p className="text-neutral-300">If that email exists, a reset link is on its way.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h1 className="text-xl font-bold text-neutral-100">Forgot password</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
      />
      <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
        Send reset link
      </button>
    </form>
  );
}