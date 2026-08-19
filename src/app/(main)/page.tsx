import { Suspense } from "react";
import PostFeed from "@/components/PostFeed";
import PostCardSkeleton from "@/components/PostCardSkeleton";
import { getPaginatedPosts } from "@/lib/posts";
import { getCurrentUser } from "@/lib/dal";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-neutral-100">DevConnect</h1>
      <p className="mt-1 text-neutral-400">Welcome to the feed.</p>
      <Suspense fallback={<FeedSkeleton />}>
        <FeedContent />
      </Suspense>
    </main>
  );
}

async function FeedContent() {
  const [{ posts, nextCursor }, user] = await Promise.all([
    getPaginatedPosts(),
    getCurrentUser(),
  ]);

  return (
    <>
     
    <PostFeed initialPosts={posts} initialCursor={nextCursor} username={user?.username ?? ""} isLoggedIn={!!user} />
    </>
  );
}

function FeedSkeleton() {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  );
}