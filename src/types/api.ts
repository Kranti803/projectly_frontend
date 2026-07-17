// ---------------------------------------------------------------------------
// Standard API response envelope
// ---------------------------------------------------------------------------

/** Successful API response wrapper */
export interface ApiResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
}

/** Paginated API response wrapper */
export interface PaginatedApiResponse<T = unknown> {
  success: true;
  message: string;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/** Error response shape returned by the server */
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  stack?: string; // only present in development
}
