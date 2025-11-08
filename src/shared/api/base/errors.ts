export class ApiError extends Error {
  public readonly name: string = 'ApiError';
  public readonly timestamp: Date;

  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number,
    public readonly errors?: Record<string, string[]>,
    public readonly details?: any
  ) {
    super(message);
    this.timestamp = new Date();

    // Maintain proper stack trace (only for V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    // Set prototype explicitly for instanceof checks
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Axios error dan ApiError yaratish
   */
  static fromAxiosError(error: any): ApiError {
    // Response error (4xx, 5xx)
    if (error.response) {
      const { data, status, statusText } = error.response;

      return new ApiError(
        data?.message || statusText || 'Server xatosi',
        data?.code || this.getErrorCodeFromStatus(status),
        status,
        data?.errors,
        data
      );
    }

    // Request error (network, timeout, etc)
    if (error.request) {
      if (error.code === 'ECONNABORTED') {
        return new ApiError("So'rov vaqti tugadi", 'TIMEOUT_ERROR', 408);
      }

      return new ApiError(
        "Serverga ulanib bo'lmadi. Internet aloqasini tekshiring.",
        'NETWORK_ERROR',
        0
      );
    }

    // Other errors
    return new ApiError(error.message || "Noma'lum xatolik", 'UNKNOWN_ERROR', 0);
  }

  /**
   * Fetch error dan ApiError yaratish
   */
  static fromFetchError(error: any): ApiError {
    if (error.name === 'AbortError') {
      return new ApiError("So'rov bekor qilindi", 'ABORTED', 0);
    }

    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return new ApiError("Serverga ulanib bo'lmadi", 'NETWORK_ERROR', 0);
    }

    return new ApiError(error.message || "Noma'lum xatolik", 'UNKNOWN_ERROR', 0);
  }

  /**
   * Response object dan ApiError yaratish
   */
  static async fromResponse(response: Response): Promise<ApiError> {
    let data: any;

    try {
      data = await response.json();
    } catch {
      data = { message: response.statusText };
    }

    return new ApiError(
      data?.message || response.statusText || 'Server xatosi',
      data?.code || this.getErrorCodeFromStatus(response.status),
      response.status,
      data?.errors,
      data
    );
  }

  /**
   * HTTP status dan error code olish
   */
  private static getErrorCodeFromStatus(status: number): string {
    const statusCodes: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      405: 'METHOD_NOT_ALLOWED',
      408: 'TIMEOUT',
      409: 'CONFLICT',
      422: 'VALIDATION_ERROR',
      429: 'RATE_LIMIT',
      500: 'INTERNAL_SERVER_ERROR',
      502: 'BAD_GATEWAY',
      503: 'SERVICE_UNAVAILABLE',
      504: 'GATEWAY_TIMEOUT',
    };

    return statusCodes[status] || 'UNKNOWN_ERROR';
  }

  /**
   * Error type checkers
   */
  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  isServerError(): boolean {
    return this.status >= 500 && this.status < 600;
  }

  isNetworkError(): boolean {
    return this.status === 0 || this.code === 'NETWORK_ERROR';
  }

  isUnauthorized(): boolean {
    return this.status === 401 || this.code === 'UNAUTHORIZED';
  }

  isForbidden(): boolean {
    return this.status === 403 || this.code === 'FORBIDDEN';
  }

  isNotFound(): boolean {
    return this.status === 404 || this.code === 'NOT_FOUND';
  }

  isValidationError(): boolean {
    return this.status === 422 || this.code === 'VALIDATION_ERROR' || !!this.errors;
  }

  isTimeout(): boolean {
    return this.status === 408 || this.code === 'TIMEOUT_ERROR';
  }

  isRateLimitError(): boolean {
    return this.status === 429 || this.code === 'RATE_LIMIT';
  }

  /**
   * Error message ni locale ga qarab olish
   */
  getLocalizedMessage(locale: 'uz' | 'ru' | 'en' = 'uz'): string {
    const messages = ERROR_MESSAGES[this.code] || ERROR_MESSAGES.UNKNOWN;
    return messages[locale] || this.message;
  }

  /**
   * User-friendly message
   */
  getUserMessage(locale: 'uz' | 'ru' | 'en' = 'uz'): string {
    if (this.isValidationError() && this.errors) {
      return this.getLocalizedMessage(locale);
    }

    if (this.isNetworkError()) {
      return locale === 'uz'
        ? 'Internet aloqasini tekshiring'
        : locale === 'ru'
          ? 'Проверьте интернет соединение'
          : 'Check your internet connection';
    }

    return this.getLocalizedMessage(locale);
  }

  /**
   * Validation errors ni olish
   */
  getValidationErrors(): Record<string, string[]> | null {
    return this.errors || null;
  }

  /**
   * Birinchi validation error ni olish
   */
  getFirstValidationError(): string | null {
    if (!this.errors) return null;

    const firstKey = Object.keys(this.errors)[0];
    return this.errors[firstKey]?.[0] || null;
  }

  /**
   * Error ni log qilish
   */
  log(): void {
    console.error('[ApiError]', {
      message: this.message,
      code: this.code,
      status: this.status,
      errors: this.errors,
      timestamp: this.timestamp,
      stack: this.stack,
    });
  }

  /**
   * Error ni JSON formatda olish
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      status: this.status,
      errors: this.errors,
      timestamp: this.timestamp,
    };
  }

  /**
   * Error ni string ga aylantirish
   */
  toString(): string {
    return `[${this.code}] ${this.message} (Status: ${this.status})`;
  }
}

/**
 * Error Messages (Multi-language)
 */
export const ERROR_MESSAGES: Record<string, { uz: string; ru: string; en: string }> = {
  NETWORK_ERROR: {
    uz: "Internetga ulanishda xatolik. Iltimos, qayta urinib ko'ring.",
    ru: 'Ошибка подключения к интернету. Пожалуйста, попробуйте еще раз.',
    en: 'Network connection error. Please try again.',
  },
  TIMEOUT_ERROR: {
    uz: "So'rov vaqti tugadi. Iltimos, qayta urinib ko'ring.",
    ru: 'Время запроса истекло. Пожалуйста, попробуйте еще раз.',
    en: 'Request timeout. Please try again.',
  },
  ABORTED: {
    uz: "So'rov bekor qilindi",
    ru: 'Запрос отменен',
    en: 'Request aborted',
  },

  // Authentication Errors
  UNAUTHORIZED: {
    uz: 'Tizimga kirishingiz kerak',
    ru: 'Необходима авторизация',
    en: 'Authentication required',
  },
  FORBIDDEN: {
    uz: "Sizda bu amalni bajarish uchun ruxsat yo'q",
    ru: 'У вас нет прав для выполнения этого действия',
    en: "You don't have permission to perform this action",
  },
  INVALID_CREDENTIALS: {
    uz: "Email yoki parol noto'g'ri",
    ru: 'Неверный email или пароль',
    en: 'Invalid email or password',
  },
  TOKEN_EXPIRED: {
    uz: 'Sessiya tugagan. Iltimos, qaytadan kiring.',
    ru: 'Сессия истекла. Пожалуйста, войдите снова.',
    en: 'Session expired. Please login again.',
  },

  // Validation Errors
  VALIDATION_ERROR: {
    uz: "Ma'lumotlar noto'g'ri kiritilgan",
    ru: 'Данные введены неверно',
    en: 'Validation failed',
  },
  BAD_REQUEST: {
    uz: "Noto'g'ri so'rov",
    ru: 'Неверный запрос',
    en: 'Bad request',
  },

  // Resource Errors
  NOT_FOUND: {
    uz: "Ma'lumot topilmadi",
    ru: 'Данные не найдены',
    en: 'Resource not found',
  },
  ALREADY_EXISTS: {
    uz: "Bu ma'lumot allaqachon mavjud",
    ru: 'Эти данные уже существуют',
    en: 'Resource already exists',
  },
  CONFLICT: {
    uz: "Ma'lumotlar konflikti",
    ru: 'Конфликт данных',
    en: 'Data conflict',
  },

  // Rate Limiting
  RATE_LIMIT: {
    uz: "Juda ko'p so'rov yuborildi. Biroz kuting.",
    ru: 'Слишком много запросов. Пожалуйста, подождите.',
    en: 'Too many requests. Please wait.',
  },

  // Server Errors
  INTERNAL_SERVER_ERROR: {
    uz: "Server xatosi. Iltimos, keyinroq urinib ko'ring.",
    ru: 'Ошибка сервера. Пожалуйста, попробуйте позже.',
    en: 'Internal server error. Please try again later.',
  },
  BAD_GATEWAY: {
    uz: "Server bilan bog'lanishda xatolik",
    ru: 'Ошибка связи с сервером',
    en: 'Bad gateway',
  },
  SERVICE_UNAVAILABLE: {
    uz: 'Xizmat vaqtincha mavjud emas',
    ru: 'Сервис временно недоступен',
    en: 'Service temporarily unavailable',
  },
  GATEWAY_TIMEOUT: {
    uz: 'Server javob bermadi',
    ru: 'Сервер не ответил',
    en: 'Gateway timeout',
  },

  // Unknown Error
  UNKNOWN: {
    uz: "Noma'lum xatolik yuz berdi",
    ru: 'Произошла неизвестная ошибка',
    en: 'An unknown error occurred',
  },
  UNKNOWN_ERROR: {
    uz: "Noma'lum xatolik yuz berdi",
    ru: 'Произошла неизвестная ошибка',
    en: 'An unknown error occurred',
  },

  // Business Logic Errors
  INSUFFICIENT_FUNDS: {
    uz: "Mablag' yetarli emas",
    ru: 'Недостаточно средств',
    en: 'Insufficient funds',
  },
  OUT_OF_STOCK: {
    uz: 'Mahsulot omborda tugagan',
    ru: 'Товар закончился на складе',
    en: 'Product out of stock',
  },
  INVALID_QUANTITY: {
    uz: "Noto'g'ri miqdor",
    ru: 'Неверное количество',
    en: 'Invalid quantity',
  },
} as const;

/**
 * Error Codes
 */
export const ERROR_CODES = {
  // Network
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  ABORTED: 'ABORTED',

  // Auth
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',

  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',

  // Resource
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  CONFLICT: 'CONFLICT',

  // Rate Limit
  RATE_LIMIT: 'RATE_LIMIT',

  // Server
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  BAD_GATEWAY: 'BAD_GATEWAY',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  GATEWAY_TIMEOUT: 'GATEWAY_TIMEOUT',

  // Unknown
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  RATE_LIMIT: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

/**
 * Helper functions
 */

/**
 * Error ni user-friendly message ga aylantirish
 */
export function getErrorMessage(error: unknown, locale: 'uz' | 'ru' | 'en' = 'uz'): string {
  if (error instanceof ApiError) {
    return error.getUserMessage(locale);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return ERROR_MESSAGES.UNKNOWN[locale];
}

/**
 * Error ni console ga log qilish
 */
export function logError(error: unknown, context?: string): void {
  const timestamp = new Date().toISOString();
  const contextStr = context ? `[${context}]` : '';

  console.error(`${timestamp} ${contextStr}`, error);

  if (error instanceof ApiError) {
    error.log();
  }
}

/**
 * Error ni Sentry yoki boshqa monitoring service ga yuborish
 */
export function reportError(error: unknown, context?: Record<string, any>): void {
  // TODO: Integrate with error monitoring service (Sentry, LogRocket, etc)
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureException(error, { contexts: context });
    console.error('[Error Reported]', error, context);
  }
}

/**
 * Validation errors ni format qilish
 */
export function formatValidationErrors(errors: Record<string, string[]>): string {
  return Object.entries(errors)
    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
    .join('\n');
}

/**
 * Error ni JSON stringga aylantirish
 */
export function stringifyError(error: unknown): string {
  if (error instanceof ApiError) {
    return JSON.stringify(error.toJSON(), null, 2);
  }

  if (error instanceof Error) {
    return JSON.stringify(
      {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      null,
      2
    );
  }

  return JSON.stringify(error, null, 2);
}

/**
 * Retry logic uchun error check
 */
export function isRetryableError(error: unknown): boolean {
  if (error instanceof ApiError) {
    return (
      error.isNetworkError() || error.isTimeout() || error.status === 503 || error.status === 504
    );
  }

  return false;
}

/**
 * Type guard
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
