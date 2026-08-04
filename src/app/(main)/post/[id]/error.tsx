"use client";
type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main>
      <h1>Error</h1>
      <p>An error occurred while loading the content: {error.message}</p>
      <button onClick={() => reset()} className="px-4 py-2 bg-red-500 text-white rounded">
        Retry
      </button>
    </main>
  );
}
