import LikeButton from "@/components/LikeButton";
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
 

  const initialLikes = 10;
  return (
    <main>
      <h1>Post {id}</h1>
      <p>This is the content of post {id}.</p>

      <LikeButton intialLikes={initialLikes} />
    </main>
  );
}