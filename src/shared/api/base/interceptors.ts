import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { STORAGE_KEYS, API_CONFIG } from './config';
import { ApiError } from './errors';

// Request interceptor
export function requestInterceptor(config: InternalAxiosRequestConfig) {
  // Add auth token
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  // Add API Key (agar kerak bo'lsa)
  if (API_CONFIG.apiKey && config.headers) {
    config.headers['X-API-Key'] = API_CONFIG.apiKey;
  }

  // Log request
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
  }

  return config;
}

export function requestErrorInterceptor(error: unknown) {
  return Promise.reject(error);
}

// Response interceptor
export function responseInterceptor(response: AxiosResponse) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API] Response:`, response.data);
  }

  // Return data directly or full response (depends on your API)
  // Option 1: Return only data
  return response.data;

  // Option 2: Return full response
  // return response;
}

export function responseErrorInterceptor(error: unknown) {
  const apiError = ApiError.fromAxiosError(error);

  // Handle 401 - Redirect to login
  if (apiError.isUnauthorized() && typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    window.location.href = '/login';
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('[API Error]', apiError);
  }

  return Promise.reject(apiError);
}
