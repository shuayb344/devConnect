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
  const { username } = await params;
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProfileContent username={username} />
    </Suspense>
  );
}

async function ProfileContent({ username }: { username: string }) {
  "use cache";
  cacheLife({ stale: 5, revalidate: 15, expire: 120 });
  const initialFollowers = 5;
  const renderedAt = new Date().toISOString();
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-neutral-100">Profile of {username}</h1>
      <p className="mt-2 text-neutral-400">This is the content of the profile for user {username}.</p>
      <p className="mt-2 text-sm opacity-75">Rendered at: {renderedAt}</p>
      <div className="mt-4">
        <FollowButton initialFollowers={initialFollowers} />
      </div>
    </main>
  );
}