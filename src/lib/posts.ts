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

  // Simulates DB/network latency so you can observe cache hits vs misses
  await new Promise((resolve) => setTimeout(resolve, 300));

  return MOCK_POSTS;
}