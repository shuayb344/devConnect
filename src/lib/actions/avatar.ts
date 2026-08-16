"use server";

import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/dal";
import { revalidatePath } from "next/cache";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export type AvatarUploadState = { error?: string; success?: boolean };

export async function uploadAvatar(
  _prevState: AvatarUploadState,
  formData: FormData
): Promise<AvatarUploadState> {
  const user = await requireUser();

  const file = formData.get("avatar");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Please choose an image." };
  }


  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Only JPEG, PNG, or WebP images are allowed." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: "Image must be under 2MB." };
  }

  const blob = await put(`avatars/${user.id}-${Date.now()}`, file, {
    access: "public",
    contentType: file.type,
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { image: blob.url },
  });

  revalidatePath("/dashboard");
  return { success: true };
}