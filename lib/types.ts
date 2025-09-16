export interface Organization {
  ein: number;
  strein: string | null;
  name: string;
  sub_name: string | null;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  subseccd: number | null;
  ntee_code: string;
  guidestar_url: string | null;
  nccs_url: string | null;
  id: number;
  searchable_text: string;
  created_at: string;
  updated_at: string;
  irs_updated: string | null;
  filings?: Filing[];
}

export interface Filing {
  ein: number;
  tax_prd: number;
  tax_prd_yr: number;
  formtype: number;
  pdf_url: string | null;
  totrevenue: string;
  totfuncexpns: string;
  totassetsend: string;
  totliabend: string;
  pct_compnsatncurrofcr: string;
  raw_data: string;
  id: number;
  organization_id: number;
  created_at: string;
  updated_at: string | null;
  irs_updated: string;
}

export interface OrganizationWithFilings extends Organization {
  filings: Filing[];
}

export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
}

export interface SearchResult extends Organization {
  relevance_score: number;
  match_type: string;
}

export interface SemanticSearchResponse {
  results: SearchResult[];
  total_results: number;
  query: string;
  query_components: Record<string, unknown>;
  search_type: string;
}

export interface SearchFilters {
  q?: string;
  state?: string;
  subseccd?: number;
  search_type?: 'semantic' | 'keyword' | 'hybrid';
  limit?: number;
}

export interface ApolloCompanyData {
  name: string;
  domain: string;
  industry: string;
  employee_count: number;
  revenue: string;
  founded_year: number;
  headquarters_address: string;
  description: string;
}

export interface LeadershipInfo {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
}

export interface ContactInfo {
  type?: string;
  value?: string;
  verified?: boolean;
}

export interface RecentNews {
  title?: string;
  url?: string;
  date?: string;
  source?: string;
}

export interface ApolloContact {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
}

export interface OrganizationEnrichment {
  enrichment_id: number;
  organization_id: number;
  status: string;
  last_enriched: string;
  website_url?: string;
  website_scraped: boolean;
  apollo_searched: boolean;
  apollo_enriched: boolean;
  leadership_info: LeadershipInfo[];
  contact_info: ContactInfo[];
  recent_news: RecentNews[];
  apollo_company_data?: ApolloCompanyData;
  apollo_contacts: ApolloContact[];
  error_message?: string;
  created_at: string;
  updated_at: string;
}
