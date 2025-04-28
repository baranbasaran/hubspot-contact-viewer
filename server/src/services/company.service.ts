import { BaseService } from "./base.service";
import {
  Company,
  CompanyProperties,
  HubSpotCompanyResponse,
} from "../types/company.types";

export class CompanyService extends BaseService {
  constructor() {
    super("companies");
  }

  private transformCompany(hubspotCompany: HubSpotCompanyResponse): Company {
    const { id, properties } = hubspotCompany;
    return { id, properties };
  }

  async getCompanies(): Promise<Company[]> {
    const response = await this.get<{ results: HubSpotCompanyResponse[] }>();
    return response.results.map((company) => this.transformCompany(company));
  }

  async getCompanyById(id: string): Promise<Company> {
    const response = await this.get<HubSpotCompanyResponse>(`/${id}`);
    return this.transformCompany(response);
  }

  async createCompany(properties: CompanyProperties): Promise<Company> {
    const cleanProperties = Object.entries(properties).reduce(
      (acc, [key, value]) => {
        if (
          value != null &&
          !["id", "createdate", "lastmodifieddate"].includes(key)
        ) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>
    );

    const response = await this.post<HubSpotCompanyResponse>({
      properties: cleanProperties,
    });
    return this.transformCompany(response);
  }

  async updateCompany(
    id: string,
    properties: Partial<CompanyProperties>
  ): Promise<void> {
    await this.patch(id, { properties });
  }

  async deleteCompany(id: string): Promise<void> {
    await this.delete(id);
  }

  async associateContactWithCompany(
    contactId: string,
    companyId: string
  ): Promise<void> {
    try {
      await this.post(
        {},
        `/contacts/${contactId}/associations/companies/${companyId}`
      );
    } catch (error) {
      return this.handleHubSpotError(error, "associate contact with company");
    }
  }

  async getAssociatedCompanies(contactId: string): Promise<Company[]> {
    try {
      const response = await this.get<{ results: { toObjectId: string }[] }>(
        `/contacts/${contactId}/associations/companies`
      );

      const companyIds = response.results.map((result) => result.toObjectId);
      const companies = await Promise.all(
        companyIds.map((id) => this.getCompanyById(id))
      );

      return companies;
    } catch (error) {
      return this.handleHubSpotError(error, "fetch associated companies");
    }
  }
}
