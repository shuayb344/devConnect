import { cacheLife, cacheTag } from "next/cache";

type Post = {
  id: number;
  title: string;
  authorUsername: string;
  createdAt: string;
};

// TODO(Phase 2, later lesson): replace with a Prisma query against Postgres.
// Keeping this as an in-memory mock for now so today's lesson is only
// about caching + Route Handlers, not database setup yet.
const MOCK_POSTS: Post[] = [
  { id: 1, title: "Why React Server Components changed everything", authorUsername: "john_doe", createdAt: "2026-07-01T10:00:00Z" },
  { id: 2, title: "Cursor pagination vs offset pagination", authorUsername: "jane_smith", createdAt: "2026-07-05T14:30:00Z" },
  { id: 3, title: "Debugging hydration mismatches in production", authorUsername: "john_doe", createdAt: "2026-07-10T09:15:00Z" },
];

export async function getCachedPosts() {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });
  cacheTag("posts");
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Copy before sorting — MOCK_POSTS is module-scope, shared across every
  // request (Mental Model #7). Sorting in place would silently reorder
  // the source of truth every time anyone reads it. Copy, then sort.
  return [...MOCK_POSTS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
let nextPostId = MOCK_POSTS.length + 1;

export async function createPostRecord(data: { title: string; authorUsername: string }) {
  const newPost: Post = {
    id: nextPostId++,
    title: data.title,
    authorUsername: data.authorUsername,
    createdAt: new Date().toISOString(),
  };
  MOCK_POSTS.push(newPost);
  return newPost;
}
export async function deletePostRecord(id: number) {
  const index = MOCK_POSTS.findIndex((p) => p.id === id);
  if (index === -1) {
    return { error: "Post not found" };
  }
  MOCK_POSTS.splice(index, 1);
}