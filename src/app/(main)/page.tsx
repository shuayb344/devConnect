import { Suspense } from "react";
import CreatePostForm from "@/components/CreatePostForm";
import PostFeed from "@/components/PostFeed";
import PostCardSkeleton from "@/components/PostCardSkeleton";
import { getPaginatedPosts } from "@/lib/posts";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-neutral-100">DevConnect</h1>
      <p className="mt-1 text-neutral-400">Welcome to the feed.</p>
      <div className="mt-6">
        <CreatePostForm />
      </div>
      <Suspense fallback={<FeedSkeleton />}>
        <FeedContent />
      </Suspense>
    </main>
  );
}

async function FeedContent() {
  const { posts, nextCursor } = await getPaginatedPosts();
  return <PostFeed initialPosts={posts} initialCursor={nextCursor} />;
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