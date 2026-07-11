export default async function HomePage() {
  const renderedAt = new Date().toISOString();
  return (
    <main>
      <h1>DevConnect</h1>
      <p>Welcome to the feed.</p>
      <p className=" opacity-75">Rendered at: {renderedAt}</p>
    </main>
  );
}