/**
 * API Base Types
 * Barcha API calls uchun umumiy type definitions
 */

// ==========================================
// HTTP Methods
// ==========================================
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// ==========================================
// API Response Wrappers
// ==========================================

/**
 * Standart API response format
 * Backend odatda quyidagicha format qaytaradi:
 * { success: true, data: {...}, message: "..." }
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Alternative response format
 * Ba'zi API'lar faqat data qaytaradi
 */
export interface ApiResponseSimple<T = any> {
  data: T;
}

/**
 * Response with metadata
 */
export interface ApiResponseWithMeta<T = any> {
  data: T;
  meta?: {
    timestamp: string;
    version: string;
    [key: string]: any;
  };
}

// ==========================================
// API Error Types
// ==========================================

/**
 * API Error response
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  code: string;
  errors?: Record<string, string[]>; // Validation errors
  details?: any;
}

/**
 * Validation Error
 */
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ValidationErrors {
  [field: string]: string[];
}

// ==========================================
// Pagination Types
// ==========================================

/**
 * Pagination parameters (Request)
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

/**
 * Pagination metadata (Response)
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Paginated Response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

/**
 * Alternative: Offset-based pagination
 */
export interface OffsetPaginationMeta {
  offset: number;
  limit: number;
  total: number;
}

export interface OffsetPaginatedResponse<T> {
  data: T[];
  pagination: OffsetPaginationMeta;
}

/**
 * Cursor-based pagination (for infinite scroll)
 */
export interface CursorPaginationMeta {
  nextCursor: string | null;
  prevCursor: string | null;
  hasMore: boolean;
}

export interface CursorPaginatedResponse<T> {
  data: T[];
  pagination: CursorPaginationMeta;
}

// ==========================================
// Sorting & Filtering
// ==========================================

/**
 * Sort parameters
 */
export type SortOrder = 'asc' | 'desc';

export interface SortParams {
  field: string;
  order: SortOrder;
}

/**
 * Filter parameters
 */
export interface FilterParams {
  [key: string]: any;
}

/**
 * Search parameters
 */
export interface SearchParams {
  query?: string;
  fields?: string[]; // Fields to search in
}

/**
 * Combined query parameters
 */
export interface QueryParams {
  pagination?: PaginationParams;
  sort?: SortParams;
  filter?: FilterParams;
  search?: SearchParams;
}

// ==========================================
// Request Configuration
// ==========================================

/**
 * API Request configuration
 */
export interface ApiRequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, any>; // URL query parameters
  data?: any; // Request body
  timeout?: number;
  withAuth?: boolean; // Automatically add auth token
  signal?: AbortSignal; // For request cancellation
}

/**
 * Request headers
 */
export interface RequestHeaders {
  'Content-Type'?: string;
  Authorization?: string;
  Accept?: string;
  'Accept-Language'?: string;
  'X-API-Key'?: string;
  [key: string]: string | undefined;
}

// ==========================================
// Authentication Types
// ==========================================

/**
 * Auth tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;
}

/**
 * Auth response
 */
export interface AuthResponse<T = any> {
  user: T;
  tokens: AuthTokens;
}

// ==========================================
// Upload Types
// ==========================================

/**
 * File upload
 */
export interface FileUpload {
  file: File;
  fieldName?: string;
  onProgress?: (progress: number) => void;
}

/**
 * File upload response
 */
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

/**
 * Multiple file upload response
 */
export interface MultiFileUploadResponse {
  files: FileUploadResponse[];
}

// ==========================================
// Batch Operations
// ==========================================

/**
 * Batch request
 */
export interface BatchRequest<T = any> {
  requests: T[];
}

/**
 * Batch response
 */
export interface BatchResponse<T = any> {
  results: T[];
  errors?: Array<{
    index: number;
    error: string;
  }>;
}

// ==========================================
// Status Types
// ==========================================

/**
 * Loading state
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

/**
 * Fetch state
 */
export interface FetchState<T> extends LoadingState {
  data: T | null;
}

/**
 * Mutation state (for create/update/delete)
 */
export interface MutationState extends LoadingState {
  isSuccess: boolean;
}

// ==========================================
// API Endpoint Types
// ==========================================

/**
 * API Endpoint definition
 */
export interface ApiEndpoint {
  url: string;
  method: HttpMethod;
  auth?: boolean;
}

/**
 * API Endpoints collection
 */
export type ApiEndpoints = Record<string, string | ((...args: any[]) => string)>;

// ==========================================
// Webhook Types
// ==========================================

/**
 * Webhook payload
 */
export interface WebhookPayload<T = any> {
  event: string;
  data: T;
  timestamp: string;
  signature?: string;
}

// ==========================================
// API Version Types
// ==========================================

/**
 * API Version
 */
export type ApiVersion = 'v1' | 'v2' | 'v3';

/**
 * Versioned endpoint
 */
export interface VersionedEndpoint {
  version: ApiVersion;
  path: string;
}

// ==========================================
// Rate Limiting
// ==========================================

/**
 * Rate limit info
 */
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp
}

// ==========================================
// Cache Types
// ==========================================

/**
 * Cache options
 */
export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  key?: string; // Custom cache key
  revalidate?: boolean; // Force revalidation
}

// ==========================================
// Retry Types
// ==========================================

/**
 * Retry options
 */
export interface RetryOptions {
  maxRetries?: number;
  retryDelay?: number; // in milliseconds
  retryCondition?: (error: any) => boolean;
}

// ==========================================
// GraphQL Types (if needed)
// ==========================================

/**
 * GraphQL query
 */
export interface GraphQLQuery {
  query: string;
  variables?: Record<string, any>;
  operationName?: string;
}

/**
 * GraphQL response
 */
export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

// ==========================================
// Utility Types
// ==========================================

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make specific properties required
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Omit properties recursively
 */
export type DeepOmit<T, K extends string> = T extends object
  ? {
      [P in Exclude<keyof T, K>]: DeepOmit<T[P], K>;
    }
  : T;

/**
 * Extract array element type
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

/**
 * Make properties nullable
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

/**
 * Async function type
 */
export type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;

// ==========================================
// Resource Types (CRUD)
// ==========================================

/**
 * Resource with timestamps
 */
export interface ResourceWithTimestamps {
  createdAt: string;
  updatedAt: string;
}

/**
 * Resource with ID
 */
export interface ResourceWithId {
  id: string;
}

/**
 * Base resource
 */
export interface BaseResource extends ResourceWithId, ResourceWithTimestamps {}

/**
 * Resource list response
 */
export interface ResourceListResponse<T> {
  items: T[];
  total: number;
}

// ==========================================
// Type Guards
// ==========================================

/**
 * Check if response is paginated
 */
export function isPaginatedResponse<T>(response: any): response is PaginatedResponse<T> {
  return (
    response &&
    typeof response === 'object' &&
    'data' in response &&
    'pagination' in response &&
    Array.isArray(response.data)
  );
}

/**
 * Check if response is error
 */
export function isApiError(response: any): response is ApiErrorResponse {
  return (
    response && typeof response === 'object' && response.success === false && 'message' in response
  );
}

// ==========================================
// Constants
// ==========================================

/**
 * HTTP Status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export type HttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

/**
 * Content types
 */
export const CONTENT_TYPE = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
  TEXT: 'text/plain',
  HTML: 'text/html',
  XML: 'application/xml',
} as const;

export type ContentType = (typeof CONTENT_TYPE)[keyof typeof CONTENT_TYPE];
