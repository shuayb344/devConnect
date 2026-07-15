import { Suspense } from "react";
import PostCard from "@/components/PostCard";
import PostCardSkeleton from "@/components/PostCardSkeleton";

// Deliberately mismatched delays — this is what proves out-of-order
// streaming. Post 2 (fastest) should visibly appear before Post 1
// (slowest), even though Post 1 is written first in the JSX below.
const posts = [
  { id: 1, delayMs: 100 },
  { id: 2, delayMs: 100 },
  { id: 3, delayMs: 100 },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-neutral-100">DevConnect</h1>
      <p className="mt-1 text-neutral-400">Welcome to the feed.</p>

      <div className="mt-6 flex flex-col gap-4">
        {posts.map((post) => (
          // EACH card gets its OWN Suspense boundary. This is the whole
          // lesson: if we wrapped ALL three PostCards in a single shared
          // <Suspense>, the fastest ones would be held hostage waiting
          // for the slowest (id=1, 3000ms) to finish — same waterfall
          // problem as not streaming at all. Independent boundaries let
          // each resolve and appear the moment IT is ready.
          <Suspense key={post.id} fallback={<PostCardSkeleton />}>
            <PostCard id={post.id} delayMs={post.delayMs} />
          </Suspense>
        ))}
      </div>
    </main>
  );
}