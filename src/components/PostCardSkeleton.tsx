export default function PostCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <div className="h-3 w-16 rounded bg-neutral-700" />
      <div className="mt-3 h-4 w-3/4 rounded bg-neutral-700" />
      <div className="mt-4 h-2 w-24 rounded bg-neutral-800" />
    </div>
  );
}
 
