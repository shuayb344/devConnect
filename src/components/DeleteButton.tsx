"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deletePost, type ActionState } from "@/lib/actions/posts";
const initialState: ActionState = {};
export default function DeleteButton({
  postId,
  onDeleted,
}: {
  postId: number;
  onDeleted?: () => void;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(deletePost, initialState);

  useEffect(() => {
    if (!state.success) return;
    onDeleted?.();
    router.refresh();
  }, [state.success, onDeleted, router]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={postId} />
      <button type="submit" disabled={isPending} className="text-sm text-red-400 disabled:opacity-50">
        {isPending ? "Deleting..." : "Delete"}
      </button>
      {state?.error && <p className="text-xs text-red-400">{state.error}</p>}
    </form>
  );
}