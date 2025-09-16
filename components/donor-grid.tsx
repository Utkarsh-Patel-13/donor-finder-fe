"use client";

import { useState, useEffect } from "react";
import { Organization, SearchFilters, SearchResult } from "@/lib/types";
import { getOrganizations, searchOrganizations } from "@/lib/api";
import { DonorCard } from "./donor-card";
import { DonorSearchCard } from "./donor-search-card";
import { DonorSearch } from "./donor-search";
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

type ViewMode = 'browse' | 'search';

export function DonorGrid() {
  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('browse');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    search_type: 'semantic',
    limit: 10,
  });
  const [totalResults, setTotalResults] = useState(0);
  const [currentQuery, setCurrentQuery] = useState<string>('');

  const fetchAllBrowseData = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch all data at once - API returns all data with hardcoded limit
      const data = await getOrganizations(50); // Large limit to get all data
      
      setAllOrganizations(data);
      setViewMode('browse');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch organizations");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filters: SearchFilters) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentPage(1);
      
      const searchFiltersWithDefaults = {
        ...filters,
        limit: filters.limit || 20,
        search_type: filters.search_type || 'semantic',
      };
      
      const response = await searchOrganizations(searchFiltersWithDefaults);
      
      setSearchResults(response.results);
      setTotalResults(response.total_results);
      setCurrentQuery(response.query);
      setSearchFilters(searchFiltersWithDefaults);
      setViewMode('search');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search organizations");
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setTotalResults(0);
    setCurrentQuery('');
    setSearchFilters({
      search_type: 'semantic',
      limit: 20,
    });
    setCurrentPage(1);
    setViewMode('browse');
  };

  useEffect(() => {
    fetchAllBrowseData();
  }, []); // Only fetch once on mount

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="space-y-6">
        <DonorSearch
          onSearch={handleSearch}
          onClear={handleClearSearch}
          isLoading={loading}
          currentFilters={searchFilters}
        />
        <div className="text-center py-12">
          <p className="text-destructive mb-4">Error: {error}</p>
          <button
            onClick={() =>
              viewMode === "search"
                ? handleSearch(searchFilters)
                : fetchAllBrowseData()
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const isSearchMode = viewMode === 'search';
  
  // Get current page data for browse mode (frontend pagination)
  const getCurrentPageOrganizations = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allOrganizations.slice(startIndex, endIndex);
  };
  
  const displayData = isSearchMode ? searchResults : getCurrentPageOrganizations();
  
  // Calculate pagination
  const totalPages = isSearchMode 
    ? Math.ceil(totalResults / (searchFilters.limit || 20))
    : Math.ceil(allOrganizations.length / ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <DonorSearch
        onSearch={handleSearch}
        onClear={handleClearSearch}
        isLoading={loading}
        currentFilters={searchFilters}
      />

      {/* Results Summary */}
      {isSearchMode && (
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-semibold">
                Search Results {totalResults > 0 && `(${totalResults} found)`}
              </h3>
              {currentQuery && (
                <p className="text-sm text-muted-foreground">
                  Query: &quot;{currentQuery}&quot;
                </p>
              )}
            </div>
            {searchFilters.search_type && (
              <div className="text-sm text-muted-foreground">
                Search type: {searchFilters.search_type}
              </div>
            )}
          </div>
        </div>
      )}

      {loading ? (
        <DonorGridSkeleton />
      ) : displayData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {isSearchMode ? "No organizations found matching your search." : "No organizations found."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayData.map((item) => 
              isSearchMode ? (
                <DonorSearchCard 
                  key={item.id} 
                  searchResult={item as SearchResult}
                  query={currentQuery}
                />
              ) : (
                <DonorCard key={item.id} organization={item as Organization} />
              )
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
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
                      if (currentPage < totalPages) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}