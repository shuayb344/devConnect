export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <h1>Authentication</h1>
      </header>
      <main className = "container mx-auto p-4">
        {children}
      </main>
    </div>
  );
}