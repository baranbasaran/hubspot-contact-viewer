import axios from "axios";
import { Contact } from "../types/contact.types";
import {
  ApiResponse,
  ErrorResponse,
  PaginatedResponse,
} from "../types/common.types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export async function fetchContacts({
  page = 1,
  limit = 9,
}: PaginationParams = {}): Promise<PaginatedResponse<Contact>> {
  try {
    const response = await axios.get<ApiResponse<PaginatedResponse<Contact>>>(
      `${API_BASE_URL}/api/contacts`,
      { params: { page, limit } }
    );

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to fetch contacts");
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.error || "Failed to fetch contacts");
    }
    throw error;
  }
}

export const createContact = async (
  properties: Contact["properties"]
): Promise<Contact> => {
  try {
    const response = await axios.post<ApiResponse<Contact>>(
      `${API_BASE_URL}/api/contacts`,
      { properties }
    );

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to create contact");
    }

    return response.data.data;
  } catch (error) {
    console.error("Error creating contact:", error);
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.error || "Failed to create contact");
    }
    throw error;
  }
};

export async function fetchContactById(id: string): Promise<Contact> {
  try {
    const response = await axios.get<ApiResponse<Contact>>(
      `${API_BASE_URL}/api/contacts/${id}`
    );

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to fetch contact");
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching contact:", error);
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.error || "Failed to fetch contact");
    }
    throw error;
  }
}

export const updateContact = async (
  id: string,
  properties: Partial<Contact["properties"]>
): Promise<void> => {
  try {
    const response = await axios.patch<ApiResponse<void>>(
      `${API_BASE_URL}/api/contacts/${id}`,
      { properties }
    );

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to update contact");
    }
  } catch (error) {
    console.error("Error updating contact:", error);
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.error || "Failed to update contact");
    }
    throw error;
  }
};

export const deleteContact = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete<ApiResponse<void>>(
      `${API_BASE_URL}/api/contacts/${id}`
    );

    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to delete contact");
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new Error(errorResponse?.error || "Failed to delete contact");
    }
    throw error;
  }
};
