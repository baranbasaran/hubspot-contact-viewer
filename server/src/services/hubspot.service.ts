import axios from "axios";
import { BaseService } from "./base.service";
import {
  Contact,
  ContactProperties,
  HubSpotContact,
  HubSpotApiResponse,
  HubSpotApiResponseSchema,
} from "../types/contact.types";
import { PaginatedResponse } from "../types/common.types";

export class HubSpotService extends BaseService {
  private readonly contactProperties = [
    "firstname",
    "lastname",
    "email",
    "phone",
    "city",
    "address",
    "hs_full_name_or_email",
    "industry",
    "jobtitle",
    "company",
    "website",
    "state",
    "country",
    "lifecyclestage",
    "hs_lead_status",
    "createdate",
    "lastmodifieddate",
    "hs_object_id",
  ].join(",");

  constructor() {
    super("contacts");
  }

  private transformContact(hubspotContact: HubSpotContact): Contact {
    return {
      id: hubspotContact.id,
      properties: {
        firstname: hubspotContact.properties.firstname || "",
        lastname: hubspotContact.properties.lastname || "",
        email: hubspotContact.properties.email || "",
        phone: hubspotContact.properties.phone || "",
        city: hubspotContact.properties.city || "",
        address: hubspotContact.properties.address || "",
        hs_full_name_or_email:
          hubspotContact.properties.hs_full_name_or_email || "",
        industry: hubspotContact.properties.industry || "",
        jobtitle: hubspotContact.properties.jobtitle || "",
        company: hubspotContact.properties.company || "",
        website: hubspotContact.properties.website || "",
        state: hubspotContact.properties.state || "",
        country: hubspotContact.properties.country || "",
        lifecyclestage: hubspotContact.properties.lifecyclestage || "",
        hs_lead_status: hubspotContact.properties.hs_lead_status || "",
        createdate: hubspotContact.properties.createdate || "",
        lastmodifieddate: hubspotContact.properties.lastmodifieddate || "",
        hs_object_id: hubspotContact.properties.hs_object_id || "",
      },
      createdAt: hubspotContact.properties.createdate || "",
      updatedAt: hubspotContact.properties.lastmodifieddate || "",
      archived: hubspotContact.archived || false,
    };
  }

  async getContacts(): Promise<PaginatedResponse<Contact>> {
    const response = await this.get<HubSpotApiResponse>("", {
      properties: this.contactProperties,
    });

    const validatedData = HubSpotApiResponseSchema.parse(response);
    const contacts = validatedData.results.map((contact) =>
      this.transformContact(contact)
    );

    return {
      items: contacts,
      total: validatedData.total ?? 0,
      page: 1,
      limit: contacts.length,
      hasMore: false,
    };
  }

  async getContactById(id: string): Promise<Contact> {
    const response = await this.get<HubSpotContact>(`/${id}`, {
      properties: this.contactProperties,
    });
    return this.transformContact(response);
  }

  async createContact(properties: ContactProperties): Promise<Contact> {
    const response = await this.post<HubSpotContact>({ properties });
    return this.transformContact(response);
  }

  async updateContact(
    id: string,
    properties: ContactProperties
  ): Promise<void> {
    await this.patch(id, { properties });
  }

  async deleteContact(id: string): Promise<void> {
    await this.delete(id);
  }

  async getCompanies(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<any>> {
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const offset = (page - 1) * limit;

      const response = await axios.get<HubSpotApiResponse>(
        `${this.baseUrl}/companies`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
          params: {
            limit,
            offset,
            properties: [
              "name",
              "domain",
              "industry",
              "phone",
              "address",
              "city",
              "state",
              "country",
              "createdate",
              "lastmodifieddate",
            ],
          },
        }
      );

      return {
        items: response.data.results,
        total: response.data.total ?? 0,
        page: 1,
        limit: response.data.results.length,
        hasMore: false,
      };
    } catch (error) {
      console.error("Error fetching companies:", error);
      throw new Error("Failed to fetch companies from HubSpot");
    }
  }

  async getCompanyById(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/companies/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        params: {
          properties: [
            "name",
            "domain",
            "industry",
            "phone",
            "address",
            "city",
            "state",
            "country",
            "createdate",
            "lastmodifieddate",
          ],
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching company:", error);
      throw new Error("Failed to fetch company from HubSpot");
    }
  }

  async createCompany(properties: Record<string, string>): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/companies`,
        { properties },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error creating company:", error);
      throw new Error("Failed to create company in HubSpot");
    }
  }

  async updateCompany(
    id: string,
    properties: Record<string, string>
  ): Promise<void> {
    try {
      await axios.patch(
        `${this.baseUrl}/companies/${id}`,
        { properties },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating company:", error);
      throw new Error("Failed to update company in HubSpot");
    }
  }

  async deleteCompany(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/companies/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    } catch (error) {
      console.error("Error deleting company:", error);
      throw new Error("Failed to delete company from HubSpot");
    }
  }
}
