import axios from 'axios';
import { Contact, ApiResponse } from '../types/contact.types';

const API_BASE_URL = 'http://localhost:3001/api';

export const fetchContacts = async (): Promise<Contact[]> => {
  try {
    console.log('Fetching contacts from API:', `${API_BASE_URL}/contacts`);
    
    const response = await axios.get<ApiResponse<Contact[]>>(`${API_BASE_URL}/contacts`);
    console.log('API response:', response.data);
    
    if (!response.data.success) {
      console.error('API returned error:', response.data.error);
      throw new Error(response.data.error || 'Failed to fetch contacts');
    }
    
    console.log('Number of contacts:', response.data.data.length);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const createContact = async (contactData: Partial<Contact>): Promise<Contact> => {
  try {
    console.log('Creating contact with data:', contactData);

    // Format the data for HubSpot API
    const properties = Object.entries(contactData).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = String(value); // Ensure all values are strings
      }
      return acc;
    }, {} as Record<string, string>);

    console.log('Formatted properties:', properties);

    const response = await axios.post<ApiResponse<Contact>>(
      `${API_BASE_URL}/contacts`,
      { properties }
    );

    console.log('Server response:', response.data);

    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to create contact');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error creating contact:', error);
    
    if (axios.isAxiosError(error)) {
      // Handle API error responses
      const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message ||
                         error.message ||
                         'Failed to create contact';
      throw new Error(errorMessage);
    }
    
    // Handle other types of errors
    throw error instanceof Error ? error : new Error('Failed to create contact');
  }
};

export const getContactById = async (id: string): Promise<Contact> => {
  try {
    const response = await axios.get<ApiResponse<Contact>>(`${API_BASE_URL}/contacts/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to fetch contact');
    }
    return response.data.data;
  } catch (error) {
    console.error('Error fetching contact:', error);
    throw error;
  }
};

export const updateContact = async (id: string, contactData: Partial<Contact>): Promise<void> => {
  try {
    console.log(`Updating contact with ID: ${id}`, contactData);

    // Format the data for HubSpot API
    const properties = Object.entries(contactData).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = String(value); // Ensure all values are strings
      }
      return acc;
    }, {} as Record<string, string>);

    console.log('Formatted properties for update:', properties);

    const response = await axios.patch<ApiResponse<null>>(
      `${API_BASE_URL}/contacts/${id}`,
      { properties }
    );

    console.log('Update response:', response.data);

    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to update contact');
    }
  } catch (error) {
    console.error('Error updating contact:', error);
    
    if (axios.isAxiosError(error)) {
      // Handle API error responses
      const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message ||
                         error.message ||
                         'Failed to update contact';
      throw new Error(errorMessage);
    }
    
    // Handle other types of errors
    throw error instanceof Error ? error : new Error('Failed to update contact');
  }
};

export const deleteContact = async (id: string): Promise<void> => {
  try {
    console.log(`Deleting contact with ID: ${id}`);
    
    const response = await axios.delete<ApiResponse<null>>(`${API_BASE_URL}/contacts/${id}`);
    
    console.log('Delete response:', response.data);

    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete contact');
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    
    if (axios.isAxiosError(error)) {
      // Handle API error responses
      const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message ||
                         error.message ||
                         'Failed to delete contact';
      throw new Error(errorMessage);
    }
    
    // Handle other types of errors
    throw error instanceof Error ? error : new Error('Failed to delete contact');
  }
}; 