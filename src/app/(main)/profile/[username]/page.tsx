import { Suspense } from "react";
import FollowButton from "@/components/FollowButton";
import { cacheLife } from "next/cache";
type ProfilePageProps = {
  params: Promise<{
    username: string;
  }>;
};
export async function generateStaticParams() {
  return [{ username: "john_doe" }, { username: "jane_smith" }];
}
export default async function ProfilePage({ params }: ProfilePageProps) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProfileContent params={params} />
    </Suspense>
  );
}

 async function ProfileContent({ params }: ProfilePageProps) {
  "use cache";
  cacheLife({stale : 5 , revalidate : 15 , expire : 120});
  const { username } = await params;
  const initialFollowers = 5;
  const renderedAt = new Date().toISOString();
  return (
    <main>
      <h1>Profile of {username}</h1>
      <p>This is the content of the profile for user {username}.</p>
      <p className=" opacity-75">Rendered at: {renderedAt}</p>
      <FollowButton initialFollowers={initialFollowers} />
    </main>
  );
}