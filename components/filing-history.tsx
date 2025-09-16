import { Filing } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency, formatLargeNumber } from "@/lib/api";

interface FilingHistoryProps {
  filings: Filing[];
}

export function FilingHistory({ filings }: FilingHistoryProps) {
  const sortedFilings = [...filings].sort((a, b) => b.tax_prd_yr - a.tax_prd_yr);
  
  const getRevenueChange = (current: Filing, previous: Filing | undefined) => {
    if (!previous) return null;
    
    const currentRevenue = parseFloat(current.totrevenue);
    const previousRevenue = parseFloat(previous.totrevenue);
    
    if (isNaN(currentRevenue) || isNaN(previousRevenue) || previousRevenue === 0) {
      return null;
    }
    
    const change = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
    return {
      percentage: change,
      isPositive: change > 0,
      amount: currentRevenue - previousRevenue
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Filing History ({sortedFilings.length} filings)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedFilings.map((filing, index) => {
            const previousFiling = sortedFilings[index + 1];
            const revenueChange = getRevenueChange(filing, previousFiling);
            
            return (
              <div key={filing.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">Tax Year {filing.tax_prd_yr}</h4>
                      <Badge variant="outline" className="text-xs">
                        Form {filing.formtype}
                      </Badge>
                      {index === 0 && (
                        <Badge variant="default" className="text-xs">
                          Latest
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Revenue:</span>
                        <div className="font-medium">
                          {formatLargeNumber(filing.totrevenue)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatCurrency(filing.totrevenue)}
                        </div>
                        {revenueChange && (
                          <div className={`flex items-center gap-1 text-xs mt-1 ${
                            revenueChange.isPositive ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {revenueChange.isPositive ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {revenueChange.percentage > 0 ? '+' : ''}
                            {revenueChange.percentage.toFixed(1)}%
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground">Assets:</span>
                        <div className="font-medium">
                          {formatLargeNumber(filing.totassetsend)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatCurrency(filing.totassetsend)}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground">Expenses:</span>
                        <div className="font-medium">
                          {formatLargeNumber(filing.totfuncexpns)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatCurrency(filing.totfuncexpns)}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground">Liabilities:</span>
                        <div className="font-medium">
                          {formatLargeNumber(filing.totliabend)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatCurrency(filing.totliabend)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {filing.pdf_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={filing.pdf_url} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </a>
                    </Button>
                  )}
                </div>
                
                <div className="text-xs text-muted-foreground border-t pt-2">
                  Tax Period: {filing.tax_prd} • 
                  Last Updated: {new Date(filing.irs_updated).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
