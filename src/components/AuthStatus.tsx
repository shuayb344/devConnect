
import Link from "next/link";
import { getCurrentUser } from "@/lib/dal";
import { LogoutButton } from "./LogoutButton";

export default async function AuthStatus() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
      >
        Log in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-neutral-400">Hi, {user.name}</span>
      <LogoutButton />
    </div>
  );
}