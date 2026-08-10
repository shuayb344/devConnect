import LikeButton from "@/components/LikeButton";

type PostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  if (id === "crash") {
    throw new Error("Simulated failure fetching post data");
  }

  const initialLikes = 10;
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h1 className="text-xl font-bold text-neutral-100">Post #{id}</h1>
          <span className="text-xs text-neutral-400">Sample Post</span>
        </div>
        <p className="mt-4 text-neutral-300">
          This is the content of post {id}.
        </p>
        <div className="mt-6 flex items-center gap-4">
          <LikeButton initialLikes={initialLikes} />
        </div>
      </div>
    </main>
  );
}