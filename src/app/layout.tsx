import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "./globals.css";
export const metadata: Metadata = {
  title: "DevConnect",
  description: "A social platform for developers",
};

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body className="bg-neutral-950 text-neutral-100">
          <Nav />
          {children}
        </body>
      </html>
    );
}