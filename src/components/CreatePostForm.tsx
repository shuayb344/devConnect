"use client";

import { useState } from "react";

type CreatePostFormProps = {
  onCreate: (title: string) => void;
  isPending: boolean;
};

export default function CreatePostForm({ onCreate, isPending }: CreatePostFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <label htmlFor="title" className="text-sm text-neutral-400">New post title</label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
        placeholder="What did you build today?"
      />
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