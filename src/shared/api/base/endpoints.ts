/**
 * API Endpoints Configuration
 * Barcha backend API endpoints'larini bir joyda saqlash
 */

const API_BASE = '/api';

// ==========================================
// AUTH ENDPOINTS
// ==========================================

export const AUTH_ENDPOINTS = {
  // Basic Auth
  LOGIN: `${API_BASE}/auth/login`,
  REGISTER: `${API_BASE}/auth/register`,
  LOGOUT: `${API_BASE}/auth/logout`,

  // Token Management
  REFRESH_TOKEN: `${API_BASE}/auth/refresh`,
  REVOKE_TOKEN: `${API_BASE}/auth/revoke`,

  // Password Management
  FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
  CHANGE_PASSWORD: `${API_BASE}/auth/change-password`,

  // Email Verification
  VERIFY_EMAIL: `${API_BASE}/auth/verify-email`,
  RESEND_VERIFICATION: `${API_BASE}/auth/resend-verification`,

  // Social Auth
  GOOGLE_LOGIN: `${API_BASE}/auth/google`,
  FACEBOOK_LOGIN: `${API_BASE}/auth/facebook`,

  // Current User
  ME: `${API_BASE}/auth/me`,
  UPDATE_PROFILE: `${API_BASE}/auth/profile`,
} as const;

// ==========================================
// USER ENDPOINTS
// ==========================================

export const USER_ENDPOINTS = {
  // List & Search
  LIST: `${API_BASE}/users`,
  SEARCH: `${API_BASE}/users/search`,

  // CRUD Operations
  BY_ID: (id: string) => `${API_BASE}/users/${id}`,
  CREATE: `${API_BASE}/users`,
  UPDATE: (id: string) => `${API_BASE}/users/${id}`,
  DELETE: (id: string) => `${API_BASE}/users/${id}`,

  // User Profile
  PROFILE: (id: string) => `${API_BASE}/users/${id}/profile`,
  AVATAR: (id: string) => `${API_BASE}/users/${id}/avatar`,
  UPLOAD_AVATAR: (id: string) => `${API_BASE}/users/${id}/avatar/upload`,

  // User Settings
  SETTINGS: (id: string) => `${API_BASE}/users/${id}/settings`,
  PREFERENCES: (id: string) => `${API_BASE}/users/${id}/preferences`,

  // User Activity
  ACTIVITY: (id: string) => `${API_BASE}/users/${id}/activity`,
  NOTIFICATIONS: (id: string) => `${API_BASE}/users/${id}/notifications`,
} as const;

// ==========================================
// PRODUCT ENDPOINTS
// ==========================================

export const PRODUCT_ENDPOINTS = {
  // List & Search
  LIST: `${API_BASE}/products`,
  SEARCH: `${API_BASE}/products/search`,
  FEATURED: `${API_BASE}/products/featured`,
  TRENDING: `${API_BASE}/products/trending`,
  NEW_ARRIVALS: `${API_BASE}/products/new-arrivals`,

  // CRUD Operations
  BY_ID: (id: string) => `${API_BASE}/products/${id}`,
  CREATE: `${API_BASE}/products`,
  UPDATE: (id: string) => `${API_BASE}/products/${id}`,
  DELETE: (id: string) => `${API_BASE}/products/${id}`,

  // Categories
  CATEGORIES: `${API_BASE}/products/categories`,
  BY_CATEGORY: (categoryId: string) => `${API_BASE}/products/categories/${categoryId}`,

  // Images
  IMAGES: (id: string) => `${API_BASE}/products/${id}/images`,
  UPLOAD_IMAGE: (id: string) => `${API_BASE}/products/${id}/images/upload`,
  DELETE_IMAGE: (id: string, imageId: string) => `${API_BASE}/products/${id}/images/${imageId}`,

  // Reviews
  REVIEWS: (id: string) => `${API_BASE}/products/${id}/reviews`,
  ADD_REVIEW: (id: string) => `${API_BASE}/products/${id}/reviews`,

  // Variants
  VARIANTS: (id: string) => `${API_BASE}/products/${id}/variants`,

  // Stock
  STOCK: (id: string) => `${API_BASE}/products/${id}/stock`,
  UPDATE_STOCK: (id: string) => `${API_BASE}/products/${id}/stock`,

  // Related Products
  RELATED: (id: string) => `${API_BASE}/products/${id}/related`,
  SIMILAR: (id: string) => `${API_BASE}/products/${id}/similar`,
} as const;

// ==========================================
// CATEGORY ENDPOINTS
// ==========================================

export const CATEGORY_ENDPOINTS = {
  LIST: `${API_BASE}/categories`,
  BY_ID: (id: string) => `${API_BASE}/categories/${id}`,
  CREATE: `${API_BASE}/categories`,
  UPDATE: (id: string) => `${API_BASE}/categories/${id}`,
  DELETE: (id: string) => `${API_BASE}/categories/${id}`,

  // Nested categories
  CHILDREN: (id: string) => `${API_BASE}/categories/${id}/children`,
  PARENT: (id: string) => `${API_BASE}/categories/${id}/parent`,

  // Category products
  PRODUCTS: (id: string) => `${API_BASE}/categories/${id}/products`,
} as const;

// ==========================================
// NOTIFICATION ENDPOINTS
// ==========================================

export const NOTIFICATION_ENDPOINTS = {
  LIST: `${API_BASE}/notifications`,
  UNREAD: `${API_BASE}/notifications/unread`,
  MARK_READ: (id: string) => `${API_BASE}/notifications/${id}/read`,
  MARK_ALL_READ: `${API_BASE}/notifications/read-all`,
  DELETE: (id: string) => `${API_BASE}/notifications/${id}`,
  CLEAR_ALL: `${API_BASE}/notifications/clear`,

  // Notification Settings
  SETTINGS: `${API_BASE}/notifications/settings`,
  UPDATE_SETTINGS: `${API_BASE}/notifications/settings`,
} as const;

// ==========================================
// NEWS ENDPOINTS
// ==========================================

export const NEWS_ENDPOINTS = {};

// ==========================================
// SEARCH ENDPOINTS
// ==========================================

export const SEARCH_ENDPOINTS = {
  GLOBAL: `${API_BASE}/search`,
  PRODUCTS: `${API_BASE}/search/products`,
  USERS: `${API_BASE}/search/users`,
  CATEGORIES: `${API_BASE}/search/categories`,

  // Autocomplete
  AUTOCOMPLETE: `${API_BASE}/search/autocomplete`,
  SUGGESTIONS: `${API_BASE}/search/suggestions`,

  // Search History
  HISTORY: `${API_BASE}/search/history`,
  CLEAR_HISTORY: `${API_BASE}/search/history/clear`,
} as const;

// ==========================================
// FILE UPLOAD ENDPOINTS
// ==========================================

export const UPLOAD_ENDPOINTS = {
  IMAGE: `${API_BASE}/upload/image`,
  IMAGES: `${API_BASE}/upload/images`,
  FILE: `${API_BASE}/upload/file`,
  FILES: `${API_BASE}/upload/files`,
  AVATAR: `${API_BASE}/upload/avatar`,

  // Signed URLs
  PRESIGNED_URL: `${API_BASE}/upload/presigned-url`,
} as const;

// ==========================================
// ADDRESS ENDPOINTS
// ==========================================

export const ADDRESS_ENDPOINTS = {
  LIST: `${API_BASE}/addresses`,
  BY_ID: (id: string) => `${API_BASE}/addresses/${id}`,
  CREATE: `${API_BASE}/addresses`,
  UPDATE: (id: string) => `${API_BASE}/addresses/${id}`,
  DELETE: (id: string) => `${API_BASE}/addresses/${id}`,
  SET_DEFAULT: (id: string) => `${API_BASE}/addresses/${id}/default`,
} as const;

// ==========================================
// ADMIN ENDPOINTS
// ==========================================

export const ADMIN_ENDPOINTS = {
  DASHBOARD: `${API_BASE}/admin/dashboard`,
  USERS: `${API_BASE}/admin/users`,
  PRODUCTS: `${API_BASE}/admin/products`,
  ORDERS: `${API_BASE}/admin/orders`,
  ANALYTICS: `${API_BASE}/admin/analytics`,
  SETTINGS: `${API_BASE}/admin/settings`,

  // User Management
  BAN_USER: (id: string) => `${API_BASE}/admin/users/${id}/ban`,
  UNBAN_USER: (id: string) => `${API_BASE}/admin/users/${id}/unban`,

  // Content Moderation
  REPORTS: `${API_BASE}/admin/reports`,
  RESOLVE_REPORT: (id: string) => `${API_BASE}/admin/reports/${id}/resolve`,
} as const;

// ==========================================
// COMBINED EXPORT
// ==========================================

export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  USERS: USER_ENDPOINTS,
  PRODUCTS: PRODUCT_ENDPOINTS,
  CATEGORIES: CATEGORY_ENDPOINTS,
  NOTIFICATIONS: NOTIFICATION_ENDPOINTS,
  NEWS: NEWS_ENDPOINTS,
  SEARCH: SEARCH_ENDPOINTS,
  UPLOAD: UPLOAD_ENDPOINTS,
  ADDRESS: ADDRESS_ENDPOINTS,
  ADMIN: ADMIN_ENDPOINTS,
} as const;

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Build URL with query parameters
 */
export function buildUrl(endpoint: string, params?: Record<string, any>): string {
  if (!params) return endpoint;

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${endpoint}?${queryString}` : endpoint;
}

/**
 * Replace path parameters
 * Example: replacePath('/users/:id/posts/:postId', { id: '1', postId: '2' })
 * Result: '/users/1/posts/2'
 */
export function replacePath(path: string, params: Record<string, string | number>): string {
  let result = path;

  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, String(value));
  });

  return result;
}

/**
 * Get full URL
 */
export function getFullUrl(endpoint: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  return `${baseUrl}${endpoint}`;
}

// ==========================================
// TYPE EXPORTS
// ==========================================

export type ApiEndpointKey = keyof typeof API_ENDPOINTS;
export type AuthEndpointKey = keyof typeof AUTH_ENDPOINTS;
export type UserEndpointKey = keyof typeof USER_ENDPOINTS;
export type ProductEndpointKey = keyof typeof PRODUCT_ENDPOINTS;
