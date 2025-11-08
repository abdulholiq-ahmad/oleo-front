// API Configuration for External API
export const API_CONFIG = {
  // External API base URL
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',

  // API Key (agar kerak bo'lsa)
  apiKey: process.env.NEXT_PUBLIC_API_KEY,

  timeout: 30000, // 30 seconds

  headers: {
    'Content-Type': 'application/json',
    // Agar API key header da kerak bo'lsa:
    // 'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
  },
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_data',
} as const;

// Environment check
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Use mock API in development (optional)
export const USE_MOCK_API = isDevelopment && !process.env.NEXT_PUBLIC_API_URL;
