"use server";

import { z } from "zod";
import { updateTag } from "next/cache";
import { createPostRecord, deletePostRecord } from "@/lib/posts";

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

  // TODO(Phase 3, Lesson 16): hardcoded until real auth exists.
  await createPostRecord({ title: parsed.data.title,  });

  updateTag("posts");
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

  const result = await deletePostRecord(postId);
    if (result?.error) {
      return { error: result.error };
    }
    updateTag("posts");
    return { success: true };
}