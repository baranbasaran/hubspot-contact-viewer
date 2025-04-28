import axios, { AxiosError } from "axios";
import config from "../config";

interface HubSpotErrorResponse {
  message?: string;
  error?: string;
}

export abstract class BaseService {
  protected readonly baseUrl: string;
  protected readonly token: string;

  constructor(endpoint: string) {
    this.baseUrl = `https://api.hubapi.com/crm/v3/objects/${endpoint}`;
    this.token = config.hubspotApiKey;
  }

  protected getHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  protected async handleHubSpotError<T>(
    error: unknown,
    operation: string,
    defaultMessage: string = "An unexpected error occurred"
  ): Promise<T> {
    console.error(`Error ${operation}:`, error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<HubSpotErrorResponse>;
      const hubspotError =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message;

      throw new Error(`Failed to ${operation} in HubSpot: ${hubspotError}`);
    }

    if (error instanceof Error) {
      throw new Error(`Failed to ${operation} in HubSpot: ${error.message}`);
    }

    throw new Error(`Failed to ${operation} in HubSpot: ${defaultMessage}`);
  }

  protected async get<T>(
    path: string = "",
    params?: Record<string, any>
  ): Promise<T> {
    try {
      const response = await axios.get<T>(`${this.baseUrl}${path}`, {
        headers: this.getHeaders(),
        params,
      });
      return response.data;
    } catch (error) {
      return this.handleHubSpotError(error, "fetch data");
    }
  }

  protected async post<T>(data: any, path: string = ""): Promise<T> {
    try {
      const response = await axios.post<T>(`${this.baseUrl}${path}`, data, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      return this.handleHubSpotError(error, "create data");
    }
  }

  protected async patch<T>(id: string, data: any): Promise<T> {
    try {
      const response = await axios.patch<T>(`${this.baseUrl}/${id}`, data, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      return this.handleHubSpotError(error, "update data");
    }
  }

  protected async delete(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/${id}`, {
        headers: this.getHeaders(),
      });
    } catch (error) {
      return this.handleHubSpotError(error, "delete data");
    }
  }
}
