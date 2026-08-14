
import DeleteButton from "./DeleteButton";

export type PostCardProps = {
  id: number;
  authorUsername: string;
  title: string;
  createdAt: string;
};
 

export default function PostCard({
  post,
  onDeleted,
}: {
  post: PostCardProps;
  onDeleted?: (postId: number) => void;
}) {

 
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <div className="flex items-center justify-between">
      <p className="text-sm text-neutral-400">Post #{post.id}</p>
      <DeleteButton postId={post.id} onDeleted={() => onDeleted?.(post.id)} />
      </div>
      <div className="mt-2">
      </div>
      <p className="mt-1 text-neutral-100">
        {post.title}
      </p>
      <p className="mt-1 text-sm text-neutral-400">
        By {post.authorUsername} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
 
