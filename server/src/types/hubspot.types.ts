import { Contact } from "./contact.types";
import { Company } from "./company.types";

export interface HubSpotConfig {
  apiKey: string;
  baseUrl: string;
  version: string;
}

export interface HubSpotApiResponse<T> {
  results: T[];
  total: number;
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
  getCompanies(): Promise<Company[]>;
  getCompanyById(id: string): Promise<Company>;
  createCompany(properties: Record<string, string>): Promise<Company>;
  updateCompany(id: string, properties: Record<string, string>): Promise<void>;
  deleteCompany(id: string): Promise<void>;
}
