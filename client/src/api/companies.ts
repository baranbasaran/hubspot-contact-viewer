import apiClient from "./axios";
import { Company } from "../types/company.types";
import { PaginatedResponse } from "../types/common.types";

export const fetchCompanies = async (
  page = 1,
  limit = 10
): Promise<PaginatedResponse<Company>> => {
  const response = await apiClient.get(`/api/companies`, {
    params: { page, limit },
  });
  return response.data.data;
};

export const fetchCompanyById = async (id: string): Promise<Company> => {
  const response = await apiClient.get(`/api/companies/${id}`);
  return response.data.data;
};

export const createCompany = async (
  companyData: Partial<Company>
): Promise<Company> => {
  const response = await apiClient.post(`/api/companies`, companyData);
  return response.data.data;
};

export const associateContactWithCompany = async (
  contactId: string,
  companyId: string
): Promise<void> => {
  await apiClient.post(`/api/contacts/${contactId}/companies/${companyId}`);
};

export const getAssociatedCompanies = async (
  contactId: string,
  page = 1,
  limit = 10
): Promise<PaginatedResponse<Company>> => {
  const response = await apiClient.get(`/api/contacts/${contactId}/companies`, {
    params: { page, limit },
  });
  return response.data.data;
};
