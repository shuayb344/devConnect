"use client";
import { useId } from "react";

// Render a deterministic value so server and client output always match.
export default function BrokenRandomBadge() {
  const id = useId();
  const hash = Array.from(id).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const value = (hash % 10000).toString().padStart(4, "0");
 
  return (
    <span className="rounded bg-green-900 px-2 py-1 text-green-200">
      Stable: {value}
    </span>
  );
}
