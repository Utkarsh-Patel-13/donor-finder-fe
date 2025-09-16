'use client';

import { getOrganization, getOrganizationEnrichment, enrichOrganization } from "@/lib/api";
import { DonorDetails } from "@/components/donor-details";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface DonorPageProps {}

export default function DonorPage({}: DonorPageProps) {
  const params = useParams();
  const ein = params.ein as string;
  
  const [organization, setOrganization] = useState(null);
  const [enrichment, setEnrichment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [enriching, setEnriching] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      
      const [orgData, enrichmentData] = await Promise.all([
        getOrganization(parseInt(ein)),
        getOrganizationEnrichment(parseInt(ein))
      ]);
      
      setOrganization(orgData);
      setEnrichment(enrichmentData);
    } catch {
      setError(true);
      notFound();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ein) {
      fetchData();
    }
  }, [ein]);

  const handleEnrich = async () => {
    try {
      setEnriching(true);
      await enrichOrganization(parseInt(ein));
      // Refresh data after successful enrichment
      await fetchData();
    } catch (error) {
      console.error('Failed to enrich organization:', error);
      // You could add a toast notification here for better UX
    } finally {
      setEnriching(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading donor details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !organization) {
    return null; // notFound() will handle this
  }
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Donors
              </Button>
            </Link>
            <Button 
              onClick={handleEnrich}
              disabled={enriching}
              className="gap-2"
            >
              {enriching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Enriching...
                </>
              ) : (
                'Enrich'
              )}
            </Button>
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
        <DonorDetails organization={organization} enrichment={enrichment} />
      </main>
    </div>
  );
}

