"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import type { Post, PostCursor } from "@/lib/posts";

type PostFeedProps = {
  initialPosts: Post[];
  initialCursor: PostCursor | null;
};

export default function PostFeed({ initialPosts, initialCursor }: PostFeedProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [cursor, setCursor] = useState(initialCursor);
  const [isLoading, setIsLoading] = useState(false);

  async function loadMore() {
    if (!cursor) return;
    setIsLoading(true);

    const params = new URLSearchParams({
      cursorId: String(cursor.id),
      cursorCreatedAt: cursor.createdAt,
    });
    const res = await fetch(`/api/posts?${params}`);
    const data: { posts: Post[]; nextCursor: PostCursor | null } = await res.json();

    setPosts((prev) => [...prev, ...data.posts]);
    setCursor(data.nextCursor);
    setIsLoading(false);
  }

  return (
    <div>
      <div className="mt-6 flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {cursor && (
        <button
          onClick={loadMore}
          disabled={isLoading}
          className="mt-4 w-full rounded bg-neutral-800 py-2 text-neutral-200 disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}