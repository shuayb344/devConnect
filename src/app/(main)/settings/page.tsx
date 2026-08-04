import { headers } from "next/headers";
import { Suspense } from "react";

export default function SettingsPage() {
  return (
    <Suspense fallback={<p style={{ padding: "2rem" }}>Loading settings…</p>}>
      <SettingsContent />
    </Suspense>
  );
}

async function SettingsContent() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "Unknown";
  const renderedAt = new Date().toISOString();
  return (
    <main>
      <h1>Settings</h1>
      <p>Manage your account settings.</p>
      <p className=" opacity-75">User Agent: {userAgent}</p>
      <p className=" opacity-75">Rendered at: {renderedAt}</p>
    </main>
  );
}