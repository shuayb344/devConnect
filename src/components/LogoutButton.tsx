"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await authClient.signOut();
        router.push("/login");
      }}
      className="text-sm text-neutral-400 hover:text-white"
    >
      Log out
    </button>
  );
}