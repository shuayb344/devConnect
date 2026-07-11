import { headers } from "next/headers";
export default async function SettingsPage() {
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