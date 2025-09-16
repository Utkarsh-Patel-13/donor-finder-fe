import { getOrganization } from "@/lib/api";
import { DonorDetails } from "@/components/donor-details";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DonorPageProps {
  params: Promise<{ ein: string }>;
}

export default async function DonorPage({ params }: DonorPageProps) {
  const { ein } = await params;
  
  try {
    const organization = await getOrganization(parseInt(ein));
    
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Donors
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              {organization.name}
            </h1>
            {organization.sub_name && (
              <p className="text-lg text-muted-foreground mt-1">
                {organization.sub_name}
              </p>
            )}
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <DonorDetails organization={organization} />
        </main>
      </div>
    );
  } catch {
    notFound();
  }
}

export async function generateMetadata({ params }: DonorPageProps) {
  const { ein } = await params;
  
  try {
    const organization = await getOrganization(parseInt(ein));
    return {
      title: `${organization.name} - Donor Finder`,
      description: `Details for ${organization.name}, a nonprofit organization.`,
    };
  } catch {
    return {
      title: "Donor Not Found - Donor Finder",
    };
  }
}
