export interface CompanyProperties {
  name: string;
  domain?: string;
  industry?: string;
  website?: string;
  description?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  createdate?: string;
  lastmodifieddate?: string;
}

export interface Company {
  id: string;
  properties: CompanyProperties;
}

export interface CompanyResponse {
  results: Company[];
  paging?: {
    next?: {
      after: string;
    };
  };
} 