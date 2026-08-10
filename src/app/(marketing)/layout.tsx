import Link from "next/link";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between">
      <header className="border-b border-neutral-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">DevConnect</Link>
          <Link href="/login" className="text-sm text-blue-400 hover:underline">Log in</Link>
        </div>
      </header>
      <main className="container mx-auto p-6 flex-grow">
        {children}
      </main>
      <footer className="border-t border-neutral-800 text-center p-4 text-sm text-neutral-500">
        <p>&copy; 2026 DevConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}