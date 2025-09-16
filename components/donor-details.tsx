import { OrganizationWithFilings } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Calendar, 
  ExternalLink,
  TrendingUp,
  DollarSign,
  FileText,
  Download
} from "lucide-react";
import { formatCurrency, formatLargeNumber } from "@/lib/api";
import { FilingHistory } from "./filing-history";

interface DonorDetailsProps {
  organization: OrganizationWithFilings;
}

export function DonorDetails({ organization }: DonorDetailsProps) {
  const location = [organization.city, organization.state].filter(Boolean).join(", ");
  const latestFiling = organization.filings?.[0];
  
  return (
    <div className="space-y-8">
      {/* Organization Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Organization Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Address</h4>
                <p className="text-sm">{organization.address}</p>
                <p className="text-sm">{location} {organization.zipcode}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Identifiers</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      EIN: {organization.ein}
                    </Badge>
                  </div>
                  {organization.ntee_code && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        NTEE: {organization.ntee_code}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">External Links</h4>
              <div className="flex flex-wrap gap-2">
                {organization.guidestar_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={organization.guidestar_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      GuideStar
                    </a>
                  </Button>
                )}
                {organization.nccs_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={organization.nccs_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      NCCS
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5" />
                Last Updated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {new Date(organization.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </CardContent>
          </Card>
          
          {latestFiling && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5" />
                  Latest Filing ({latestFiling.tax_prd_yr})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {latestFiling.pdf_url && (
                  <Button variant="outline" size="sm" className="w-full mb-3" asChild>
                    <a href={latestFiling.pdf_url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                )}
                <div className="text-xs text-muted-foreground">
                  Form Type: {latestFiling.formtype}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Financial Overview */}
      {latestFiling && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-2xl font-bold">
                  {formatLargeNumber(latestFiling.totrevenue)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {formatCurrency(latestFiling.totrevenue)}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span className="text-2xl font-bold">
                  {formatLargeNumber(latestFiling.totassetsend)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {formatCurrency(latestFiling.totassetsend)}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-red-600" />
                <span className="text-2xl font-bold">
                  {formatLargeNumber(latestFiling.totfuncexpns)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {formatCurrency(latestFiling.totfuncexpns)}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Liabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-orange-600" />
                <span className="text-2xl font-bold">
                  {formatLargeNumber(latestFiling.totliabend)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {formatCurrency(latestFiling.totliabend)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filing History */}
      {organization.filings && organization.filings.length > 0 && (
        <FilingHistory filings={organization.filings} />
      )}
    </div>
  );
}
