"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const { error: signUpError } = await authClient.signUp.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: formData.get("username") as string, // mapped to Better Auth's required `name`
      username: formData.get("username") as string,
    });

    setIsSubmitting(false);

    if (signUpError) {
      setError(signUpError.message ?? "Sign up failed");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h1 className="text-xl font-bold text-neutral-100">Sign up</h1>
      <input name="username" placeholder="Username" required className="rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100" />
      <input name="email" type="email" placeholder="Email" required className="rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100" />
      <input name="password" type="password" placeholder="Password" required minLength={8} className="rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100" />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
        {isSubmitting ? "Creating account..." : "Sign up"}
      </button>
    </form>
  );
}