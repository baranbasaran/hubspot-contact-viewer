import axios from "axios";
import { ErrorResponse } from "../types/common.types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // You can transform response data here if needed
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ErrorResponse;
      const errorMessage =
        errorResponse?.error || error.message || "An unexpected error occurred";

      // You can handle specific error cases here
      if (error.response?.status === 401) {
        // Handle unauthorized access
        // localStorage.removeItem('token');
        // window.location.href = '/login';
      }

      throw new Error(errorMessage);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
