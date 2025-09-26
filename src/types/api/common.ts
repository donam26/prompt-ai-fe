/**
 * Common API response types for list endpoints
 */

/**
 * Generic API response structure for list endpoints
 */
export interface ApiListResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Generic API response structure for single item endpoints
 */
export interface ApiSingleResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Generic API response structure for success operations (create, update, delete)
 */
export interface ApiSuccessResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Generic API response structure for error responses
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

/**
 * Union type for all API responses
 */
export type ApiResponse<T = any> =
  | ApiListResponse<T>
  | ApiSingleResponse<T>
  | ApiSuccessResponse
  | ApiErrorResponse;

/**
 * Type guard to check if response is a list response
 */
export function isApiListResponse<T>(
  response: ApiResponse<T>
): response is ApiListResponse<T> {
  return "pagination" in response;
}

/**
 * Type guard to check if response is a single response
 */
export function isApiSingleResponse<T>(
  response: ApiResponse<T>
): response is ApiSingleResponse<T> {
  return (
    "data" in response && !("pagination" in response) && !("error" in response)
  );
}

/**
 * Type guard to check if response is a success response
 */
export function isApiSuccessResponse(
  response: ApiResponse
): response is ApiSuccessResponse {
  return (
    "message" in response &&
    !("pagination" in response) &&
    !("error" in response)
  );
}

/**
 * Type guard to check if response is an error response
 */
export function isApiErrorResponse(
  response: ApiResponse
): response is ApiErrorResponse {
  return "error" in response;
}

/**
 * Utility type to safely cast query data to ApiListResponse
 * Use this when you know the data should be ApiListResponse but TypeScript can't infer it
 */
export type SafeApiListData<T = any> = ApiListResponse<T> | undefined;

/**
 * Utility function to safely cast query data to ApiListResponse
 * @param data - The data from useQuery
 * @returns Typed data as ApiListResponse or undefined
 */
export function asApiListData<T = any>(data: unknown): SafeApiListData<T> {
  return data as ApiListResponse<T> | undefined;
}

/**
 * Utility type to safely cast query data to ApiSingleResponse
 */
export type SafeApiSingleData<T = any> = ApiSingleResponse<T> | undefined;

/**
 * Utility function to safely cast query data to ApiSingleResponse
 * @param data - The data from useQuery
 * @returns Typed data as ApiSingleResponse or undefined
 */
export function asApiSingleData<T = any>(data: unknown): SafeApiSingleData<T> {
  return data as ApiSingleResponse<T> | undefined;
}
