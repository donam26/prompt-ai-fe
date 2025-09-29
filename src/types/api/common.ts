/**
 * API Response types - chuẩn cho tất cả API responses
 */

import type { PaginationMeta } from "../base";

// Base API response structure
export interface BaseApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

// Success response với data
export interface ApiSuccessResponse<T = unknown> extends BaseApiResponse<T> {
  success: true;
  data: T;
}

// Error response
export interface ApiErrorResponse extends BaseApiResponse {
  success: false;
  error?: string;
  details?: Record<string, unknown>;
}

// Paginated response
export interface PaginatedApiResponse<T = unknown>
  extends BaseApiResponse<T[]> {
  pagination: PaginationMeta;
}

// Generic API error type
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: Record<string, unknown>;
}

// Service response wrapper
export interface ServiceResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// API endpoint configuration
export interface ApiEndpoint {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  timeout?: number;
}
