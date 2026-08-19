"use client";

import { useState, useOptimistic, useTransition } from "react";
import PostCard from "./PostCard";
import CreatePostForm from "./CreatePostForm";
import type { Post, PostCursor } from "@/lib/posts";
import { deletePost, createPost } from "@/lib/actions/posts";

type PostFeedProps = {
  initialPosts: Post[];
  initialCursor: PostCursor | null;
  username: string;
  isLoggedIn: boolean;
};

type OptimisticAction =
  | { type: "delete"; id: number }
  | { type: "add"; post: Post };

export default function PostFeed({ initialPosts, initialCursor, username, isLoggedIn }: PostFeedProps) {
  const [extraPosts, setExtraPosts] = useState<Post[]>([]);
  const [cursor, setCursor] = useState(initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  
  const seen = new Set<number>();
  const allPosts = [...initialPosts, ...extraPosts].filter((post) => {
    if (seen.has(post.id)) return false;
    seen.add(post.id);
    return true;
  });

  const [optimisticPosts, dispatchOptimistic] = useOptimistic(
    allPosts,
    (currentPosts, action: OptimisticAction) => {
      if (action.type === "delete") {
        return currentPosts.filter((post) => post.id !== action.id);
      }
      
      return [action.post, ...currentPosts];
    }
  );

  function handleDelete(postId: number) {
    startTransition(async () => {
      dispatchOptimistic({ type: "delete", id: postId });
      const formData = new FormData();
      formData.set("id", String(postId));
      const result = await deletePost({}, formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  function handleCreate(title: string) {
    startTransition(async () => {
   
      const tempPost: Post = {
        id: -Date.now(),
        title,
        authorUsername: username,
        createdAt: new Date().toISOString(),
      };
      dispatchOptimistic({ type: "add", post: tempPost });

      const formData = new FormData();
      formData.set("title", title);
      const result = await createPost({}, formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

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
      setExtraPosts((prev) => [...prev, ...data.posts]);
      setCursor(data.nextCursor);
    } catch {
      setError("Couldn't load more posts. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {isLoggedIn && (
        <div className="mt-6">
          <CreatePostForm onCreate={handleCreate} isPending={isPending} />
        </div>
      )}
      <div className="mt-6 flex flex-col gap-4">
        {optimisticPosts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={handleDelete} isPending={isPending} />
        ))}
      </div>
      {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
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