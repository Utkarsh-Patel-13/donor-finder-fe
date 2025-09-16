import { DonorGrid } from "@/components/donor-grid";
import { Suspense } from "react";
import { DonorGridSkeleton } from "@/components/donor-grid-skeleton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Donor Finder</h1>
          <p className="text-muted-foreground mt-2">
            Discover foundations and grantmakers to support your nonprofit mission
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<DonorGridSkeleton />}>
          <DonorGrid />
        </Suspense>
      </main>
    </div>
  );
}