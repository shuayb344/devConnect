// src/app/(auth)/reset-password/ResetPasswordForm.tsx
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    const { error: resetError } = await authClient.resetPassword({
      newPassword: password,
      token,
    });

    if (resetError) {
      setError(resetError.message ?? "Reset failed.");
      return;
    }

    router.push("/login");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h1 className="text-xl font-bold text-neutral-100">Reset password</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New password"
        required
        minLength={8}
        className="rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
        Reset password
      </button>
    </form>
  );
}