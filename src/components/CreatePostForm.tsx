"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { type ActionState, createPost } from "@/lib/actions/posts";

const initialState: ActionState = {};

export default function CreatePostForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createPost, initialState);

  useEffect(() => {
    if (!state.success) return;
    formRef.current?.reset();
    router.refresh();
  }, [state.success, router]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <label htmlFor="title" className="text-sm text-neutral-400">New post title</label>
      <input
        id="title"
        name="title"
        type="text"
        className="rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
        placeholder="What did you build today?"
      />
      {state.error && <p className="text-sm text-red-400">{state.error}</p>}
      {state.success && <p className="text-sm text-green-400">Post created.</p>}
      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? "Posting..." : "Create post"}
      </button>
    </form>
  );
}