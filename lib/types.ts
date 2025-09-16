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
  subseccd?: number;
  search_type?: 'semantic' | 'keyword' | 'hybrid';
  limit?: number;
}

export interface ApolloCompanyData {
  id?: string;
  name: string;
  website_url?: string;
  blog_url?: string;
  angellist_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  primary_phone?: {
    number: string;
    source?: string;
    sanitized_number?: string;
  };
  languages?: string[];
  alexa_ranking?: number;
  phone?: string;
  linkedin_uid?: string;
  founded_year: number;
  publicly_traded_symbol?: string;
  publicly_traded_exchange?: string;
  logo_url?: string;
  crunchbase_url?: string;
  primary_domain?: string;
  sic_codes?: string[];
  naics_codes?: string[];
  sanitized_phone?: string;
  industry: string;
  estimated_num_employees?: number;
  keywords?: string[];
  organization_revenue_printed?: string;
  organization_revenue?: number;
  industries?: string[];
  secondary_industries?: string[];
  snippets_loaded?: boolean;
  industry_tag_id?: string;
  industry_tag_hash?: Record<string, string>;
  retail_location_count?: number;
  raw_address?: string;
  street_address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  owned_by_organization_id?: string;
  short_description?: string;
  suborganizations?: Array<{
    id: string;
    name: string;
    website_url?: string;
  }>;
  num_suborganizations?: number;
  annual_revenue_printed?: string;
  annual_revenue?: number;
  total_funding?: number;
  total_funding_printed?: string;
  latest_funding_round_date?: string;
  latest_funding_stage?: string;
  funding_events?: any[];
  technology_names?: string[];
  current_technologies?: Array<{
    uid: string;
    name: string;
    category: string;
  }>;
  org_chart_root_people_ids?: string[];
  org_chart_sector?: string;
  org_chart_removed?: boolean;
  org_chart_show_department_filter?: boolean;
  departmental_head_count?: Record<string, number>;
  generic_org_insights?: any;
  domain?: string;
  employee_count?: number;
  revenue?: string;
  headquarters_address?: string;
  description?: string;
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
  type?: string;
  description?: string;
  url?: string;
  published_date?: string;
  snippet?: string;
  source?: string;
  date?: string;
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
  company_metrics?: {
    revenue?: number;
    employees?: number;
    industry?: string;
    keywords?: string[];
    technologies?: string[];
    founded_year?: number;
    phone?: string;
    linkedin_url?: string;
    twitter_url?: string;
    facebook_url?: string;
  };
  error_message?: string;
  created_at: string;
  updated_at: string;
}
