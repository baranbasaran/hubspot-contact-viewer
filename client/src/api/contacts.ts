import apiClient from "./axios";
import { Contact } from "../types/contact.types";
import { PaginatedResponse } from "../types/common.types";

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export async function fetchContacts({
  page = 1,
  limit = 9,
}: PaginationParams = {}): Promise<PaginatedResponse<Contact>> {
  const response = await apiClient.get(`/api/contacts`, {
    params: { page, limit },
  });
  return response.data.data;
}

export const createContact = async (
  properties: Contact["properties"]
): Promise<Contact> => {
  const response = await apiClient.post(`/api/contacts`, { properties });
  return response.data.data;
};

export async function fetchContactById(id: string): Promise<Contact> {
  const response = await apiClient.get(`/api/contacts/${id}`);
  return response.data.data;
}

export const updateContact = async (
  id: string,
  properties: Partial<Contact["properties"]>
): Promise<void> => {
  await apiClient.patch(`/api/contacts/${id}`, { properties });
};

export const deleteContact = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/contacts/${id}`);
};
