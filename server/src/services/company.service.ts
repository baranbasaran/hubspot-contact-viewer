import axios from 'axios';
import { HubSpotService } from './hubspot.service';
import { Company, CompanyProperties, CompanyResponse, HubSpotCompanyResponse } from '../types/company.types';

export class CompanyService {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(hubspotService: HubSpotService) {
    this.baseUrl = 'https://api.hubapi.com/crm/v3/objects/companies';
    this.token = hubspotService['token']; // Access token from HubSpotService
  }

  private transformCompany(hubspotCompany: HubSpotCompanyResponse): Company {
    const { id, properties } = hubspotCompany;
    return { id, properties };
  }

  async getCompanies(): Promise<Company[]> {
    try {
      const response = await axios.get<CompanyResponse>(this.baseUrl, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      return response.data.results.map(company => this.transformCompany(company));
    } catch (error) {
      console.error('Error fetching companies from HubSpot:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch companies from HubSpot: ${error.message}`);
      }
      throw new Error('Failed to fetch companies from HubSpot');
    }
  }

  async getCompanyById(id: string): Promise<Company> {
    try {
      const response = await axios.get<HubSpotCompanyResponse>(`${this.baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      return this.transformCompany(response.data);
    } catch (error) {
      console.error('Error fetching company from HubSpot:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch company from HubSpot: ${error.message}`);
      }
      throw new Error('Failed to fetch company from HubSpot');
    }
  }

  async createCompany(properties: CompanyProperties): Promise<Company> {
    try {
      const cleanProperties = Object.entries(properties).reduce((acc, [key, value]) => {
        if (value != null && !['id', 'createdate', 'lastmodifieddate'].includes(key)) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string>);

      const response = await axios.post<HubSpotCompanyResponse>(
        this.baseUrl,
        { properties: cleanProperties },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return this.transformCompany(response.data);
    } catch (error) {
      console.error('Error creating company in HubSpot:', error);
      if (axios.isAxiosError(error)) {
        const hubspotError = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message;
        throw new Error(`Failed to create company in HubSpot: ${hubspotError}`);
      }
      throw new Error('Failed to create company in HubSpot');
    }
  }

  async updateCompany(id: string, properties: Partial<CompanyProperties>): Promise<void> {
    try {
      await axios.patch(
        `${this.baseUrl}/${id}`,
        { properties },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error updating company in HubSpot:', error);
      if (axios.isAxiosError(error)) {
        const hubspotError = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message;
        throw new Error(`Failed to update company in HubSpot: ${hubspotError}`);
      }
      throw new Error('Failed to update company in HubSpot');
    }
  }

  async deleteCompany(id: string): Promise<void> {
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (response.status !== 204 && response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting company in HubSpot:', error);
      if (axios.isAxiosError(error)) {
        const hubspotError = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message;
        throw new Error(`Failed to delete company in HubSpot: ${hubspotError}`);
      }
      throw new Error('Failed to delete company in HubSpot');
    }
  }

  async associateContactWithCompany(contactId: string, companyId: string): Promise<void> {
    try {
      await axios.put(
        `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}/associations/companies/${companyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error associating contact with company in HubSpot:', error);
      if (axios.isAxiosError(error)) {
        const hubspotError = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message;
        throw new Error(`Failed to associate contact with company in HubSpot: ${hubspotError}`);
      }
      throw new Error('Failed to associate contact with company in HubSpot');
    }
  }

  async getAssociatedCompanies(contactId: string): Promise<Company[]> {
    try {
      const response = await axios.get(
        `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}/associations/companies`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      const companyIds = response.data.results.map((result: any) => result.toObjectId);
      const companies = await Promise.all(
        companyIds.map((id: string) => this.getCompanyById(id))
      );

      return companies;
    } catch (error) {
      console.error('Error fetching associated companies from HubSpot:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch associated companies from HubSpot: ${error.message}`);
      }
      throw new Error('Failed to fetch associated companies from HubSpot');
    }
  }
} 