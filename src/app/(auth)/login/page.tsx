"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage(){
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const { error: signInError } = await authClient.signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message ?? "Login failed");
      return;
    }

    router.push(searchParams.get("redirectedFrom") ?? "/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h1 className="text-xl font-bold text-neutral-100">Log in</h1>
      <input name="email" type="email" placeholder="Email" required className="rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100" />
      <input name="password" type="password" placeholder="Password" required className="rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100" />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}

