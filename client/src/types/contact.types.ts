// Base contact type that matches HubSpot API structure
export interface ContactProperties {
  firstname?: string;
  lastname?: string;
  email: string;
  phone?: string;
  city?: string;
  address?: string;
  hs_full_name_or_email?: string;
  industry?: string;
  jobtitle?: string;
  company?: string;
  website?: string;
  state?: string;
  country?: string;
  lifecyclestage?: string;
  hs_lead_status?: string;
  createdate?: string;
  lastmodifieddate?: string;
  hs_object_id?: string;
}

export interface Contact {
  id: string;
  properties: ContactProperties;
  createdAt?: string;
  updatedAt?: string;
  archived?: boolean;
}

// API response type
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}

// Error response type
export interface ErrorResponse {
  success: false;
  error: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export interface ContactsResponse extends PaginatedResponse<Contact> {}

export interface PaginationParams {
  page?: number;
  limit?: number;
}
