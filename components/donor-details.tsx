import { OrganizationWithFilings, OrganizationEnrichment } from "@/lib/types";
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
  Download,
  Globe,
  Users,
  Mail,
  Phone,
  Briefcase,
  Newspaper,
  MapPin,
  User,
  Link,
  Tag,
  Monitor,
  Twitter,
  Facebook,
  Linkedin
} from "lucide-react";
import { formatCurrency, formatLargeNumber } from "@/lib/api";
import { FilingHistory } from "./filing-history";

interface DonorDetailsProps {
  organization: OrganizationWithFilings;
  enrichment?: OrganizationEnrichment | null;
}

export function DonorDetails({ organization, enrichment }: DonorDetailsProps) {
  const location = [organization.city, organization.state].filter(Boolean).join(", ");
  const latestFiling = organization.filings?.[0];
  
  return (
    <div className="space-y-8">
      {/* Organization Overview */}
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
                {enrichment?.website_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={enrichment.website_url} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
                {enrichment?.apollo_company_data?.linkedin_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={enrichment.apollo_company_data.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {enrichment?.apollo_company_data?.twitter_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={enrichment.apollo_company_data.twitter_url} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </a>
                  </Button>
                )}
                {enrichment?.apollo_company_data?.facebook_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={enrichment.apollo_company_data.facebook_url} target="_blank" rel="noopener noreferrer">
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </a>
                  </Button>
                )}
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
        

      {/* Enrichment Data */}
      {enrichment && (
        <>
          {/* Company Information */}
          {enrichment.apollo_company_data && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(enrichment.apollo_company_data.description || enrichment.apollo_company_data.short_description) && (
                    <div className="md:col-span-2">
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Description</h4>
                      <p className="text-sm leading-relaxed">
                        {enrichment.apollo_company_data.short_description || enrichment.apollo_company_data.description}
                      </p>
                    </div>
                  )}
                  
                  {enrichment.apollo_company_data.industry && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Industry</h4>
                      <p className="text-sm capitalize">{enrichment.apollo_company_data.industry}</p>
                    </div>
                  )}
                  
                  {(enrichment.apollo_company_data.employee_count || enrichment.apollo_company_data.estimated_num_employees) && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Employee Count</h4>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <p className="text-sm">
                          {(enrichment.apollo_company_data.estimated_num_employees || enrichment.apollo_company_data.employee_count || 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {(enrichment.apollo_company_data.organization_revenue_printed || enrichment.apollo_company_data.annual_revenue_printed || enrichment.apollo_company_data.revenue) && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Annual Revenue</h4>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <p className="text-sm">
                          {enrichment.apollo_company_data.organization_revenue_printed || 
                           enrichment.apollo_company_data.annual_revenue_printed || 
                           enrichment.apollo_company_data.revenue}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {enrichment.apollo_company_data.founded_year && enrichment.apollo_company_data.founded_year > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Founded</h4>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <p className="text-sm">{enrichment.apollo_company_data.founded_year}</p>
                      </div>
                    </div>
                  )}
                  
                  {(enrichment.apollo_company_data.raw_address || enrichment.apollo_company_data.headquarters_address) && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Headquarters</h4>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <p className="text-sm">
                          {enrichment.apollo_company_data.raw_address || enrichment.apollo_company_data.headquarters_address}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {(enrichment.apollo_company_data.primary_domain || enrichment.apollo_company_data.domain) && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Primary Domain</h4>
                      <div className="flex items-center gap-2">
                        <Link className="h-4 w-4 text-blue-600" />
                        <p className="text-sm">{enrichment.apollo_company_data.primary_domain || enrichment.apollo_company_data.domain}</p>
                      </div>
                    </div>
                  )}
                  
                  {(enrichment.apollo_company_data.phone || enrichment.apollo_company_data.primary_phone?.number) && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Phone</h4>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-green-600" />
                        <p className="text-sm">
                          {enrichment.apollo_company_data.phone || enrichment.apollo_company_data.primary_phone?.number}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Leadership and Contacts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Leadership Information */}
            {/* {enrichment.leadership_info && enrichment.leadership_info.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Leadership Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrichment.leadership_info.map((leader, index) => (
                      <div key={index} className="border-b last:border-b-0 pb-3 last:pb-0">
                        {leader.name && (
                          <h4 className="font-medium text-sm">{leader.name}</h4>
                        )}
                        {leader.title && (
                          <p className="text-sm text-muted-foreground">{leader.title}</p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {leader.email && (
                            <Badge variant="outline" className="text-xs">
                              <Mail className="h-3 w-3 mr-1" />
                              {leader.email}
                            </Badge>
                          )}
                          {leader.phone && (
                            <Badge variant="outline" className="text-xs">
                              <Phone className="h-3 w-3 mr-1" />
                              {leader.phone}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )} */}

            {/* Apollo Contacts */}
            {enrichment.apollo_contacts && enrichment.apollo_contacts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Key Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrichment.apollo_contacts.slice(0, 5).map((contact, index) => (
                      <div key={index} className="border-b last:border-b-0 pb-3 last:pb-0">
                        {contact.name && (
                          <h4 className="font-medium text-sm">{contact.name}</h4>
                        )}
                        {contact.title && (
                          <p className="text-sm text-muted-foreground">{contact.title}</p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {contact.email && (
                            <Badge variant="outline" className="text-xs">
                              <Mail className="h-3 w-3 mr-1" />
                              {contact.email}
                            </Badge>
                          )}
                          {contact.phone && (
                            <Badge variant="outline" className="text-xs">
                              <Phone className="h-3 w-3 mr-1" />
                              {contact.phone}
                            </Badge>
                          )}
                          {contact.linkedin_url && (
                            <Button variant="outline" size="sm" asChild className="h-6 text-xs">
                              <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer">
                                LinkedIn
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Information */}
          {enrichment.contact_info && enrichment.contact_info.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {enrichment.contact_info.map((contact, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {contact.type === 'email' && <Mail className="h-4 w-4 text-blue-600" />}
                      {contact.type === 'phone' && <Phone className="h-4 w-4 text-green-600" />}
                      <div>
                        <p className="text-sm font-medium">{contact.type}</p>
                        <p className="text-sm text-muted-foreground">{contact.value}</p>
                        {contact.verified && (
                          <Badge variant="secondary" className="text-xs mt-1">Verified</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Technologies */}
          {enrichment.apollo_company_data?.current_technologies && enrichment.apollo_company_data.current_technologies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Technologies Used
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    enrichment.apollo_company_data.current_technologies.reduce((acc, tech) => {
                      if (!acc[tech.category]) acc[tech.category] = [];
                      acc[tech.category].push(tech);
                      return acc;
                    }, {} as Record<string, typeof enrichment.apollo_company_data.current_technologies>)
                  ).map(([category, techs]) => (
                    <div key={category}>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2 capitalize">{category.replace(/_/g, ' ')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Keywords */}
          {enrichment.apollo_company_data?.keywords && enrichment.apollo_company_data.keywords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Keywords & Focus Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {enrichment.apollo_company_data.keywords.slice(0, 20).map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs capitalize">
                      {keyword}
                    </Badge>
                  ))}
                  {enrichment.apollo_company_data.keywords.length > 20 && (
                    <Badge variant="secondary" className="text-xs">
                      +{enrichment.apollo_company_data.keywords.length - 20} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent News */}
          {enrichment.recent_news && enrichment.recent_news.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5" />
                  Recent News & Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrichment.recent_news.map((news, index) => (
                    <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                      {news.title && (
                        <h4 className="font-medium text-sm mb-1">{news.title}</h4>
                      )}
                      {news.description && (
                        <p className="text-sm mb-2 leading-relaxed text-muted-foreground">
                          {news.description}
                        </p>
                      )}
                      {news.snippet && (
                        <p className="text-sm mb-2 leading-relaxed">
                          {news.snippet}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {news.source && <span className="capitalize">{news.source}</span>}
                        {news.type && <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full capitalize">{news.type}</span>}
                        {(news.published_date || news.date) && (
                          <span>{new Date(news.published_date || news.date!).toLocaleDateString()}</span>
                        )}
                        {news.url && (
                          <Button variant="outline" size="sm" asChild className="h-5 text-xs ml-auto">
                            <a href={news.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Read More
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

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
