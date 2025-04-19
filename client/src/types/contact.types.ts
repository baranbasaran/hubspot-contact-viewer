// Base contact type that matches HubSpot API structure
export interface Contact {
  id: string;
  properties: {
    firstname?: string;
    lastname?: string;
    email: string;
    phone?: string;
    company?: string;
    jobtitle?: string;
    website?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    lifecyclestage?: string;
    createdate?: string;
    lastmodifieddate?: string;
  };
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