import PostCard from "./PostCard";

export default function RelatedPosts({ posts }: { posts: { id: number; delayMs: number }[] }) {
  return (
    <div className="mt-6 space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} id={post.id} delayMs={post.delayMs} />
      ))}
    </div>
  );
}