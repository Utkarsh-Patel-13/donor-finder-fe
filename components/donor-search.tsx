"use client";

import { useState } from "react";
import { SearchFilters } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, X, Filter } from "lucide-react";

interface DonorSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
  isLoading?: boolean;
  currentFilters: SearchFilters;
}


const SUBSECTION_CODES = [
  { value: 3, label: "501(c)(3) - Charitable" },
  { value: 4, label: "501(c)(4) - Social Welfare" },
  { value: 5, label: "501(c)(5) - Labor/Agricultural" },
  { value: 6, label: "501(c)(6) - Business League" },
  { value: 7, label: "501(c)(7) - Social/Recreation" },
];

const SEARCH_EXAMPLES = [
  "foundations supporting education",
  "environmental organizations",
  "disaster relief nonprofits",
];

export function DonorSearch({ onSearch, onClear, isLoading, currentFilters }: DonorSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>(currentFilters);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    const clearedFilters: SearchFilters = {
      search_type: 'semantic',
      limit: 20,
    };
    setFilters(clearedFilters);
    onClear();
  };

  const handleExampleClick = (example: string) => {
    const newFilters = { ...filters, q: example };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const hasActiveFilters = Boolean(filters.q || filters.subseccd);
  const hasActiveSearch = Boolean(currentFilters.q);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Donors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Search Input */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Try: 'foundations supporting early childhood education in California'"
              value={filters.q || ""}
              onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="pr-10"
            />
            {filters.q && (
              <button
                onClick={() => setFilters({ ...filters, q: "" })}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button onClick={handleSearch} disabled={isLoading}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Search Examples */}
        
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {SEARCH_EXAMPLES.map((example, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleExampleClick(example)}
                >
                  {example}
                </Badge>
              ))}
            </div>
          </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium mb-2 block">Organization Type</label>
                <Select
                  value={filters.subseccd?.toString() || "all"}
                  onValueChange={(value) => 
                    setFilters({ 
                      ...filters, 
                      subseccd: value === "all" ? undefined : parseInt(value)
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    {SUBSECTION_CODES.map((code) => (
                      <SelectItem key={code.value} value={code.value.toString()}>
                        {code.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Search Type</label>
                <Select
                  value={filters.search_type || "semantic"}
                  onValueChange={(value) => 
                    setFilters({ 
                      ...filters, 
                      search_type: value as 'semantic' | 'keyword' | 'hybrid'
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semantic">Semantic (Recommended)</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="keyword">Keyword</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters.q && (
              <Badge variant="default">
                Query: {filters.q}
                <button
                  onClick={() => setFilters({ ...filters, q: undefined })}
                  className="ml-2 hover:text-primary-foreground/80"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.subseccd && (
              <Badge variant="secondary">
                Type: {SUBSECTION_CODES.find(c => c.value === filters.subseccd)?.label || filters.subseccd}
                <button
                  onClick={() => setFilters({ ...filters, subseccd: undefined })}
                  className="ml-2"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Clear all
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
