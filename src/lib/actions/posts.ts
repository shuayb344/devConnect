"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createPostRecord, deletePostRecord } from "@/lib/posts";
import { createPostRateLimit } from "@/lib/rate-limit";
import { requireUser } from "../dal";

const CreatePostSchema = z.object({
  title: z
    .string()
    .trim()
    .refine((val) => val.replace(/\s/g, "").length >= 3, {
      message: "Title must contain at least 3 non-space characters",
    })
    .max(120),
});

export type ActionState = { error?: string; success?: boolean };

export async function createPost(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = CreatePostSchema.safeParse({ title: formData.get("title") });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

    try {
    const user = await requireUser();

    const { success } = await createPostRateLimit.limit(user.id);
    if (!success) {
      return { error: "You're posting too quickly. Try again later." };
    }
    await createPostRecord({ title: parsed.data.title });
  } catch {
    return { error: "You must be logged in to create a post." };
  }

  revalidatePath("/");
  return { success: true };
}

export async function deletePost(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const postId = Number(formData.get("id"));
  if (!Number.isInteger(postId)) {
    return { error: "Invalid post ID" };
  }

    try {
    const result = await deletePostRecord(postId);
    if (result?.error) {
      return { error: result.error };
    }
  } catch {
    return { error: "You must be logged in to delete a post." };
  }
  revalidatePath("/");
  return { success: true };
}