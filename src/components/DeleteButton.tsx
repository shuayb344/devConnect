"use client";

import { useActionState } from "react";
import { deletePost , type ActionState } from "@/lib/actions/posts";
const initialState: ActionState = {};
export default function DeleteButton({ postId }: { postId: number }) {
 
  const [state, formAction, isPending] = useActionState(deletePost, initialState);

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