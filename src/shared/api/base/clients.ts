import axios, { type AxiosInstance } from 'axios';
import { API_CONFIG } from './config';
import {
  requestInterceptor,
  requestErrorInterceptor,
  responseInterceptor,
  responseErrorInterceptor,
} from './interceptors';

// Create axios instance for external API
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: API_CONFIG.headers,
  });

  // Request interceptors
  client.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

  // Response interceptors
  client.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

  return client;
};

export const apiClient = createApiClient();

// Typed API methods
export const api = {
  get: <T = any>(url: string, config?: any) => apiClient.get<T>(url, config),

  post: <T = any>(url: string, data?: any, config?: any) => apiClient.post<T>(url, data, config),

  put: <T = any>(url: string, data?: any, config?: any) => apiClient.put<T>(url, data, config),

  patch: <T = any>(url: string, data?: any, config?: any) => apiClient.patch<T>(url, data, config),

  delete: <T = any>(url: string, config?: any) => apiClient.delete<T>(url, config),
};
