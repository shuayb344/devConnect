import type { Post } from "@/generated/prisma/client";

type AuthUser = { id: string; role: string };

export function canDeletePost(user: AuthUser, post: Post): boolean {
  return user.role === "admin" || post.authorId === user.id;
}

export function canEditPost(user : AuthUser, post : Post){
  return user.role === "admin" || post.authorId === user.id; 
}