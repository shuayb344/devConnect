import LikeButton from "@/components/LikeButton";
import RelatedPosts from "@/components/RelatedPosts";
import { Suspense } from "react";
type PostPageProps = {
  params: Promise<{
    id: string;
  }>;
};
 
export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (id === "crash") {
    throw new Error("Simulated failure fetching post data");
  }
  const relatedPosts = [
    { id: 1, delayMs: 3000 },
    { id: 2, delayMs: 500 },
    { id: 3, delayMs: 1500 },
  ];

  const initialLikes = 10;
  return (
    <main>
      <h1>Post {id}</h1>
      <p>This is the content of post {id}.</p>

      <LikeButton intialLikes={initialLikes} />
      <Suspense fallback={<p>Loading related posts…</p>}>
        <RelatedPosts posts={relatedPosts} />
      </Suspense>
    </main>

  );
}