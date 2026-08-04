import { getCachedPosts } from "@/lib/posts";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const postId = Number(id);

  if (!Number.isInteger(postId)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const posts = await getCachedPosts();
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ post });
}
