export interface HubSpotConfig {
  apiKey: string;
  baseUrl: string;
  version: string;
}

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

export interface ContactResponse {
  results: Contact[];
  paging?: {
    next?: {
      after: string;
    };
  };
}

export interface HubSpotService {
  getContacts(): Promise<Contact[]>;
  getContactById(id: string): Promise<Contact>;
  createContact(properties: Record<string, string>): Promise<Contact>;
  updateContact(id: string, properties: Record<string, string>): Promise<void>;
  deleteContact(id: string): Promise<void>;
} 