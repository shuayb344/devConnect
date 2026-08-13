import { NextResponse } from "next/server";
import { getPaginatedPosts, type PostCursor } from "@/lib/posts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursorId = searchParams.get("cursorId");
  const cursorCreatedAt = searchParams.get("cursorCreatedAt");
   const pageSize = searchParams.get("pageSize");

  const cursor: PostCursor | undefined =
    cursorId && cursorCreatedAt
      ? { id: Number(cursorId), createdAt: cursorCreatedAt }
      : undefined;

  const result = await getPaginatedPosts(cursor, pageSize ? Number(pageSize) : undefined);
  return NextResponse.json(result);
}