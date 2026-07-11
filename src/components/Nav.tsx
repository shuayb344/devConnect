import Link from "next/link";
export default function Nav() {
  return (
    <nav className="flex gap-4 p-4">
      <Link href="/">DevConnect</Link>
      <Link href="/post/1">Sample Post</Link>
      <Link href="/profile/johndoe">Sample Profile</Link>
      <Link href="/login">Log in</Link>
    </nav>

  );  
}