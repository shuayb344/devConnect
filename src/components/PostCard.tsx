type PostCardProps = {
  id: number;
  delayMs: number; // simulates this specific post's data taking longer/shorter
};
 
// Server Component — no "use client" needed, this never needs interactivity
// itself (the LikeButton pattern from Lesson 3 would nest inside a real
// version of this once we have real data in Phase 2).
export default async function PostCard({ id, delayMs }: PostCardProps) {
  // Simulating a real per-post DB query / API call with variable latency.
  // In Phase 2 this becomes something like:
  //   const post = await db.post.findUnique({ where: { id } });
  await new Promise((resolve) => setTimeout(resolve, delayMs));
 
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <p className="text-sm text-neutral-400">Post #{id}</p>
      <p className="mt-1 text-neutral-100">
        This is placeholder content for post {id}.
      </p>
      <p className="mt-2 text-xs text-neutral-500">
        Simulated fetch took {delayMs}ms
      </p>
    </div>
  );
}
 
