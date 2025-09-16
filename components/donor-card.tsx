import { Organization } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface DonorCardProps {
  organization: Organization;
}

export function DonorCard({ organization }: DonorCardProps) {
  const location = [organization.city, organization.state].filter(Boolean).join(", ");
  
  return (
    <Link href={`/donor/${organization.ein}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {organization.name}
            </CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>
          {organization.sub_name && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              {organization.sub_name}
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
            <span className="line-clamp-1">{organization.address}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {organization.ntee_code && (
              <Badge variant="secondary" className="text-xs">
                {organization.ntee_code}
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              EIN: {organization.ein}
            </Badge>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date(organization.updated_at).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
