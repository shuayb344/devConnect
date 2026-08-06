import { Suspense } from "react";
import CreatePostForm from "@/components/CreatePostForm";
import PostCard from "@/components/PostCard";
import PostCardSkeleton from "@/components/PostCardSkeleton";
import { getCachedPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getCachedPosts();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-neutral-100">DevConnect</h1>
      <p className="mt-1 text-neutral-400">Welcome to the feed.</p>
      <div className="mt-6">
        <CreatePostForm />
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {posts.map((post) => (
          // NOTE: all posts resolve together via the single getCachedPosts()
          // call above, so these boundaries are currently inert (fallback
          // never shows). Kept intentionally — Phase 4 gives each PostCard
          // its own independent async work again (e.g. live like counts),
          // at which point these boundaries become load-bearing.
          <Suspense key={post.id} fallback={<PostCardSkeleton />}>
            <PostCard post={post} />
          </Suspense>
        ))}
      </div>
    </main>
  );
}