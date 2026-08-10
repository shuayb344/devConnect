"use client";

import { useState } from "react";

type LikeButtonProps = {
  initialLikes: number;
};

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setIsLiked((prev) => !prev);
  };

  return (
    <button
      onClick={handleLike}
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
        isLiked
          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
          : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700"
      }`}
    >
      <span className="text-base">{isLiked ? "❤️" : "🤍"}</span>
      <span>{likes} {likes === 1 ? "like" : "likes"}</span>
    </button>
  );
}