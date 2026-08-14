import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/dal";
import { canDeletePost } from "@/lib/authorization";

const MAX_PAGE_SIZE = 20;
const DEFAULT_PAGE_SIZE = 5;

export type Post = {
  id: number;
  title: string;
  authorUsername: string;
  createdAt: string;
};
export type PostCursor = { id: number; createdAt: string };

export type PaginatedPosts = {
  posts: Post[];
  nextCursor: PostCursor | null;
};

export async function getPaginatedPosts(cursor?: PostCursor , requestedPageSize: number = DEFAULT_PAGE_SIZE): Promise<PaginatedPosts> {
  const PAGE_SIZE = Math.min(Math.max(requestedPageSize, 1), MAX_PAGE_SIZE);

  const posts = await prisma.post.findMany({
    take: PAGE_SIZE + 1, // fetch one extra to detect "is there a next page"
    ...(cursor
      ? {
          where: {
            OR: [
              { createdAt: { lt: cursor.createdAt } },
              { createdAt: cursor.createdAt, id: { lt: cursor.id } },
            ],
          },
        }
      : {}),
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: { author: { select: { username: true } } },
  });

  const hasMore = posts.length > PAGE_SIZE;
  const pageItems = hasMore ? posts.slice(0, PAGE_SIZE) : posts;

  const shaped: Post[] = pageItems.map((post) => ({
    id: post.id,
    title: post.title,
    authorUsername: post.author.username,
    createdAt: post.createdAt.toISOString(),
  }));

  const last = pageItems[pageItems.length - 1];
  const nextCursor = hasMore && last ? { id: last.id, createdAt: last.createdAt.toISOString() } : null;

  return { posts: shaped, nextCursor };
}
export async function getCachedPosts(): Promise<Post[]> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });
  cacheTag("posts");

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { username: true } } },
  });

  // Reshape Prisma's nested { author: { username } } into the flat
  // shape PostCard already expects — keeps the DB structure decoupled
  // from the UI's data contract.
  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    authorUsername: post.author.username,
    createdAt: post.createdAt.toISOString(),
  }));
}

export async function createPostRecord(data: { title: string }) {
  const user = await requireUser();
  return prisma.post.create({
    data: {
      title: data.title,
      authorId: user.id,
    },
  });
}


export async function deletePostRecord(id: number) {
  const user = await requireUser();

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    return { error: "Post not found" };
  }

  if (!canDeletePost(user, post)) {
    return { error: "You can only delete your own posts" };
  }

  await prisma.post.delete({ where: { id } });
  return {};
}