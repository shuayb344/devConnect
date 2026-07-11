export default function aboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main className="container mx-auto p-4">
        {children}
      </main>
      <footer className=" text-center p-4">
        <p>&copy; 2024 DevConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}