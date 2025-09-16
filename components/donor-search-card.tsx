import { SearchResult } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, ExternalLink, Star } from "lucide-react";
import Link from "next/link";

interface DonorSearchCardProps {
  searchResult: SearchResult;
  query?: string;
}

export function DonorSearchCard({ searchResult, query }: DonorSearchCardProps) {
  const location = [searchResult.city, searchResult.state].filter(Boolean).join(", ");
  
  // Convert relevance score to a 0-5 star rating
  const starRating = Math.round((searchResult.relevance_score / 1) * 5);
  
  // Highlight query terms in the organization name (simple implementation)
  const highlightText = (text: string, query?: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <Link href={`/donor/${searchResult.ein}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {highlightText(searchResult.name, query)}
            </CardTitle>
            <div className="flex items-center gap-1 flex-shrink-0">
              <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          {searchResult.sub_name && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              {searchResult.sub_name}
            </p>
          )}
        </CardHeader>
        
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-1">{searchResult.address}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {searchResult.ntee_code && (
              <Badge variant="secondary" className="text-xs">
                {searchResult.ntee_code}
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              EIN: {searchResult.ein}
            </Badge>
          </div>
          
          {/* Relevance Score */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < starRating 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                {searchResult.relevance_score.toFixed(2)}
              </span>
            </div>
            
            <Badge variant="outline" className="text-xs">
              {searchResult.match_type}
            </Badge>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date(searchResult.updated_at).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
