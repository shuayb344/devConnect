"use client";
import { useState } from "react";
type LikeButtonProps = {
  intialLikes: number;
}

export default function LikeButton({ intialLikes }: LikeButtonProps) {
const [likes, setLikes] = useState(intialLikes);
const [isLiked, setIsLiked] = useState(false);

const handleLike = () =>{
  if(isLiked) {
    setLikes ((prevLikes) => prevLikes - 1);
  } else {
    setLikes ((prevLikes) => prevLikes + 1);
  }
  setIsLiked((prevIsLiked) => !prevIsLiked);
}
 return (
      <button onClick={handleLike} className="px-4 py-2 bg-blue-500 text-white rounded">
      {isLiked ? "♥" : "♡"} {likes} likes
    </button>

 )
}