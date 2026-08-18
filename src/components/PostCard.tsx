
import type { Post } from "@/lib/posts";

type PostCardProps = {
  post: Post;
  onDelete: (id: number) => void;
  isPending: boolean;
};

export default function PostCard({ post, onDelete, isPending }: PostCardProps) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-400">Post #{post.id}</p>
        <button
          onClick={() => onDelete(post.id)}
          disabled={isPending}
          className="text-sm text-red-400 disabled:opacity-50"
        >
          Delete
        </button>
      </div>
      <p className="mt-1 text-neutral-100">{post.title}</p>
      <p className="mt-1 text-sm text-neutral-400">
        By {post.authorUsername} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}