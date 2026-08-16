"use client";

import { useActionState } from "react";
import { uploadAvatar, type AvatarUploadState } from "@/lib/actions/avatar"

const initialState: AvatarUploadState = {};

export default function AvatarUploadForm() {
  const [state, formAction, isPending] = useActionState(uploadAvatar, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <label htmlFor="avatar" className="text-sm text-neutral-400">
        Profile picture
      </label>
      <input
        id="avatar"
        name="avatar"
        type="file"
        accept="image/jpeg, image/png, image/webp"
        required
        className="text-sm text-neutral-300"
      />
      {state.error && <p className="text-sm text-red-400">{state.error}</p>}
      {state.success && <p className="text-sm text-green-400">Avatar updated.</p>}
      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        {isPending ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}