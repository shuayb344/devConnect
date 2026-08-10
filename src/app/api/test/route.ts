import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const count = await prisma.post.count();

    return NextResponse.json({ count });
  } catch (error) {
    console.error("FULL ERROR:", error);

    return NextResponse.json(error, {
      status: 500,
    });
  }
}