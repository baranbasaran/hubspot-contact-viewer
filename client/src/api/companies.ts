import axios from 'axios';
import { Company } from '../types/company.types';
import { ApiResponse } from '../types/contact.types';

const API_BASE_URL = 'http://localhost:3001/api';

export const fetchCompanies = async (): Promise<Company[]> => {
  try {
    const { data } = await axios.get<ApiResponse<Company[]>>(`${API_BASE_URL}/companies`);
    if (!data.success) {
      throw new Error('Failed to fetch companies');
    }
    return data.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

export const fetchCompanyById = async (id: string): Promise<Company> => {
  try {
    const { data } = await axios.get<ApiResponse<Company>>(`${API_BASE_URL}/companies/${id}`);
    if (!data.success) {
      throw new Error('Failed to fetch company');
    }
    return data.data;
  } catch (error) {
    console.error('Error fetching company:', error);
    throw error;
  }
};

export const createCompany = async (companyData: Partial<Company>): Promise<Company> => {
  try {
    const { data } = await axios.post<ApiResponse<Company>>(`${API_BASE_URL}/companies`, companyData);
    if (!data.success) {
      throw new Error('Failed to create company');
    }
    return data.data;
  } catch (error) {
    console.error('Error creating company:', error);
    throw error;
  }
};

export const associateContactWithCompany = async (contactId: string, companyId: string): Promise<void> => {
  try {
    const { data } = await axios.post<ApiResponse<void>>(
      `${API_BASE_URL}/contacts/${contactId}/companies/${companyId}`
    );
    if (!data.success) {
      throw new Error('Failed to associate contact with company');
    }
  } catch (error) {
    console.error('Error associating contact with company:', error);
    throw error;
  }
};

export const getAssociatedCompanies = async (contactId: string): Promise<Company[]> => {
  try {
    const { data } = await axios.get<ApiResponse<Company[]>>(
      `${API_BASE_URL}/contacts/${contactId}/companies`
    );
    if (!data.success) {
      throw new Error('Failed to fetch associated companies');
    }
    return data.data;
  } catch (error) {
    console.error('Error fetching associated companies:', error);
    throw error;
  }
}; 