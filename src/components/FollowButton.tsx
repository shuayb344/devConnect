"use client";
import { useState } from "react";
type FollowButtonProps = {
  initialFollowers: number;
}



export default function FollowButton({ initialFollowers }: FollowButtonProps) {
  const [followers, setFollowers] = useState(initialFollowers);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    if (isFollowing) {
      setFollowers((prevFollowers) => prevFollowers - 1);
    } else {
      setFollowers((prevFollowers) => prevFollowers + 1);
    }
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
  };
  
  return (
    <button onClick={handleFollow} className="px-4 py-2 bg-green-500 text-white rounded">
      {isFollowing ? "Following" : "Follow"} {followers} followers
    </button>
  );
}