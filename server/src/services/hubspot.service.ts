import { HubSpotConfig, Contact, ContactResponse } from '../types/hubspot.types';
import axios from 'axios';
import { ContactSchema, HubSpotContact, HubSpotContactSchema, HubSpotApiResponse } from '../types/contact.types';

export class HubSpotService {
  private config: HubSpotConfig;
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(config: HubSpotConfig) {
    this.config = config;
    this.baseUrl = `${config.baseUrl}/crm/v${config.version}/objects/contacts`;
    this.token = config.apiKey;
  }

  private transformContact(hubspotContact: any): Contact {
    try {
      // Transform to our Contact format
      const contact: Contact = {
        id: hubspotContact.id,
        properties: {
          email: hubspotContact.properties.email,
          firstname: hubspotContact.properties.firstname,
          lastname: hubspotContact.properties.lastname,
          phone: hubspotContact.properties.phone,
          company: hubspotContact.properties.company,
          jobtitle: hubspotContact.properties.jobtitle,
          website: hubspotContact.properties.website,
          address: hubspotContact.properties.address,
          city: hubspotContact.properties.city,
          state: hubspotContact.properties.state,
          country: hubspotContact.properties.country,
          lifecyclestage: hubspotContact.properties.lifecyclestage,
          createdate: hubspotContact.properties.createdate,
          lastmodifieddate: hubspotContact.properties.lastmodifieddate
        }
      };

      return contact;
    } catch (error) {
      console.error('Error transforming contact:', error);
      throw new Error(`Invalid contact data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getContacts(): Promise<Contact[]> {
    try {
      console.log('Fetching contacts from HubSpot API:', this.baseUrl);
      console.log('Using token:', this.token ? 'Token exists' : 'No token');
      
      const response = await axios.get<ContactResponse>(this.baseUrl, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      
      console.log('HubSpot API response:', JSON.stringify(response.data, null, 2));
      console.log('Number of contacts:', response.data.results?.length || 0);
      
      if (!response.data.results || response.data.results.length === 0) {
        console.log('No contacts found in the response');
        return [];
      }
      
      const transformedContacts = response.data.results.map(contact => this.transformContact(contact));
      console.log('Transformed contacts:', JSON.stringify(transformedContacts, null, 2));
      
      return transformedContacts;
    } catch (error) {
      console.error('Error fetching contacts from HubSpot:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch contacts from HubSpot: ${error.message}`);
      }
      throw new Error('Failed to fetch contacts from HubSpot');
    }
  }

  async getContactById(id: string): Promise<Contact> {
    try {
      const response = await axios.get<Contact>(`${this.baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      return this.transformContact(response.data);
    } catch (error) {
      console.error('Error fetching contact from HubSpot:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch contact from HubSpot: ${error.message}`);
      }
      throw new Error('Failed to fetch contact from HubSpot');
    }
  }

  async createContact(properties: Record<string, string>): Promise<Contact> {
    try {
      // Remove any undefined or null values
      const cleanProperties = Object.entries(properties).reduce((acc, [key, value]) => {
        if (value != null && !['id', 'createdate', 'lastmodifieddate'].includes(key)) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string>);

      const response = await axios.post<Contact>(
        this.baseUrl,
        { properties: cleanProperties },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return this.transformContact(response.data);
    } catch (error) {
      console.error('Error creating contact in HubSpot:', error);
      if (axios.isAxiosError(error)) {
        const hubspotError = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message;
        throw new Error(`Failed to create contact in HubSpot: ${hubspotError}`);
      }
      throw new Error('Failed to create contact in HubSpot');
    }
  }

  async updateContact(id: string, properties: Record<string, string>): Promise<void> {
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
      console.error('Error updating contact in HubSpot:', error);
      if (axios.isAxiosError(error)) {
        const hubspotError = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message;
        throw new Error(`Failed to update contact in HubSpot: ${hubspotError}`);
      }
      throw new Error('Failed to update contact in HubSpot');
    }
  }

  async deleteContact(id: string): Promise<void> {
    try {
      console.log(`Deleting contact with ID: ${id}`);
      
      const response = await axios.delete(`${this.baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      console.log('Delete response status:', response.status);
      
      if (response.status !== 204 && response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting contact in HubSpot:', error);
      
      if (axios.isAxiosError(error)) {
        const hubspotError = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message;
        console.error('HubSpot API Error Details:', error.response?.data);
        throw new Error(`Failed to delete contact in HubSpot: ${hubspotError}`);
      }
      
      throw new Error(`Failed to delete contact: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 