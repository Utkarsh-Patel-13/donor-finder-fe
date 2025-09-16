import { Organization, OrganizationWithFilings, SemanticSearchResponse, SearchFilters, OrganizationEnrichment } from './types';
import { config } from './config';

const API_BASE_URL = config.apiUrl;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new ApiError(response.status, `API request failed: ${response.statusText}`);
  }

  return response.json();
}

export async function getOrganizations(limit: number = 50, offset: number = 0): Promise<Organization[]> {
  return fetchApi<Organization[]>(`/organizations/?limit=${limit}&offset=${offset}`);
}

export async function getOrganization(ein: number): Promise<OrganizationWithFilings> {
  return fetchApi<OrganizationWithFilings>(`/organizations/${ein}`);
}

export async function getOrganizationEnrichment(ein: number): Promise<OrganizationEnrichment | null> {
  try {
    return await fetchApi<OrganizationEnrichment>(`/enrichment/organization/${ein}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function searchOrganizations(filters: SearchFilters): Promise<SemanticSearchResponse> {
  const params = new URLSearchParams();
  
  if (filters.q) params.append('q', filters.q);
  if (filters.search_type) params.append('search_type', filters.search_type);
  if (filters.limit) params.append('limit', filters.limit.toString());
  
  const queryString = params.toString();
  const endpoint = queryString ? `/semantic-search/?${queryString}` : '/semantic-search/';
  
  return fetchApi<SemanticSearchResponse>(endpoint);
}

export async function enrichOrganization(ein: number): Promise<void> {
  await fetchApi<void>(`/enrichment/organization/${ein}`, {
    method: 'POST',
    body: JSON.stringify({
      force_refresh: false,
      include_website_scraping: true,
      include_apollo_enrichment: true
    })
  });
}

export function formatCurrency(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '$0';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatLargeNumber(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '0';
  
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(1)}B`;
  } else if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(1)}M`;
  } else if (num >= 1e3) {
    return `$${(num / 1e3).toFixed(1)}K`;
  }
  
  return formatCurrency(num);
}
