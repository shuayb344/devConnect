"use client";
 
import { useState, useEffect } from "react";
 
// FIXED. The key idea: render something DETERMINISTIC (same on server
// and client) on the FIRST render, then compute the random value only
// AFTER hydration has already completed, inside useEffect — which, as
// established in Lesson 3, runs strictly after the component has
// mounted and matched against the server HTML. This means the value
// used DURING hydration is identical on both sides (null/placeholder),
// so there's nothing to mismatch. The random value then appears a
// moment later via a normal state update — a SEPARATE render, not
// part of the hydration comparison at all.
export default function BrokenRandomBadge() {
  const [value, setValue] = useState<string | null>(null);
 
  useEffect(() => {
    setValue(Math.random().toFixed(4));
  }, []);
 
  return (
    <span className="rounded bg-green-900 px-2 py-1 text-green-200">
      Random: {value ?? "…"}
    </span>
  );
}
