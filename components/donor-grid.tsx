"use client";

import { useState, useEffect } from "react";
import { Organization } from "@/lib/types";
import { getOrganizations } from "@/lib/api";
import { DonorCard } from "./donor-card";
import { DonorGridSkeleton } from "./donor-grid-skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 12;

export function DonorGrid() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const data = await getOrganizations(ITEMS_PER_PAGE, offset);
      
      setOrganizations(data);
      setHasMore(data.length === ITEMS_PER_PAGE);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch organizations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <DonorGridSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">Error: {error}</p>
        <button
          onClick={() => fetchData(currentPage)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (organizations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No organizations found.</p>
      </div>
    );
  }

  const totalPages = Math.max(1, currentPage + (hasMore ? 1 : 0));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {organizations.map((org) => (
          <DonorCard key={org.id} organization={org} />
        ))}
      </div>

      <Pagination className="justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
              className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            const page = Math.max(1, currentPage - 2) + i;
            if (page > totalPages) return null;
            
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (hasMore) handlePageChange(currentPage + 1);
              }}
              className={!hasMore ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
