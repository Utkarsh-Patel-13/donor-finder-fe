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
