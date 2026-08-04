export type PostCardProps = {
  id: number;
  authorUsername: string;
  title: string;
  createdAt: string;
};
 
// Server Component — no "use client" needed, this never needs interactivity
// itself (the LikeButton pattern from Lesson 3 would nest inside a real
// version of this once we have real data in Phase 2).
export default async function PostCard({ post }: { post: PostCardProps }) {
 
 
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <p className="text-sm text-neutral-400">Post #{post.id}</p>
      <p className="mt-1 text-neutral-100">
        {post.title}
      </p>
      <p className="mt-1 text-sm text-neutral-400">
        By {post.authorUsername} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
 
