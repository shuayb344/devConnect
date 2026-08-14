// src/app/(auth)/reset-password/page.tsx
import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p className="text-neutral-400">Loading...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}