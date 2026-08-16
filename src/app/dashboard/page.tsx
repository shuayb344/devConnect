import AvatarUploadForm from "@/components/AvatarUploadForm";
import AvatarImage from "./AvatarImage";
import { Suspense } from "react";


export default function DashboardPage() {
 

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-neutral-100">Dashboard</h1>
      <Suspense fallback={<p className="text-neutral-400">Loading avatar...</p>}>
      <AvatarImage />
      </Suspense>
      <div className="mt-6">
        <AvatarUploadForm />
      </div>
    </main>
  );
}


