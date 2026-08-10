import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-white hover:text-blue-400 transition-colors">
          DevConnect
        </Link>
        <div className="flex items-center gap-4 text-sm text-neutral-300">
          <Link href="/" className="hover:text-white transition-colors">
            Feed
          </Link>
          <Link href="/post/1" className="hover:text-white transition-colors">
            Sample Post
          </Link>
          <Link href="/profile/john_doe" className="hover:text-white transition-colors">
            Sample Profile
          </Link>
          <Link href="/settings" className="hover:text-white transition-colors">
            Settings
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            Log in
          </Link>
        </div>
      </div>
    </header>
  );  
}