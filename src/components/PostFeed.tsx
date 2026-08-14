"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import type { Post, PostCursor } from "@/lib/posts";

type PostFeedProps = {
  initialPosts: Post[];
  initialCursor: PostCursor | null;
};

function dedupeById(posts: Post[]): Post[] {
  const seen = new Set<number>();
  return posts.filter((post) => {
    if (seen.has(post.id)) return false;
    seen.add(post.id);
    return true;
  });
}

export default function PostFeed({ initialPosts, initialCursor }: PostFeedProps) {
  const [extraPosts, setExtraPosts] = useState<Post[]>([]);
  const [removedPostIds, setRemovedPostIds] = useState<Set<number>>(new Set());
  const [cursor, setCursor] = useState(initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadMore() {
    if (!cursor) return;
    setIsLoading(true);
    setError(null);

      try {
    const params = new URLSearchParams({
      cursorId: String(cursor.id),
      cursorCreatedAt: cursor.createdAt,
    });
    const res = await fetch(`/api/posts?${params}`);
    if (!res.ok) throw new Error("Failed to load more posts");

    const data: { posts: Post[]; nextCursor: PostCursor | null } = await res.json();
    setExtraPosts((prev) => dedupeById([...prev, ...data.posts]));
    setCursor(data.nextCursor);
  } catch {
    setError("Couldn't load more posts. Try again.");
  } finally {
    setIsLoading(false);
  }
}

  function handleDeletedPost(postId: number) {
    setRemovedPostIds((prev) => {
      const next = new Set(prev);
      next.add(postId);
      return next;
    });
    setExtraPosts((prev) => prev.filter((post) => post.id !== postId));
  }

  const allPosts = dedupeById([...initialPosts, ...extraPosts]).filter(
    (post) => !removedPostIds.has(post.id)
  );

  return (
    <div>
      <div className="mt-6 flex flex-col gap-4">
        {allPosts.map((post) => (
          <PostCard key={post.id} post={post} onDeleted={handleDeletedPost} />
        ))}
      </div>
      {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
      {cursor && (
        <button onClick={loadMore} disabled={isLoading} className="mt-4 w-full rounded bg-neutral-800 py-2 text-neutral-200 disabled:opacity-50">
          {isLoading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}