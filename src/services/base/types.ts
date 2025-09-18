import { AxiosResponse } from "axios";

// Base API response type
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success?: boolean;
  total?: number;
  page?: number;
  pageSize?: number;
}

// Pagination parameters
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// Search parameters
export interface SearchParams {
  search?: string;
  searchText?: string;
  searchTxt?: string;
}

// Filter parameters
export interface FilterParams {
  status?: string;
  type?: string;
  isType?: string | number;
  subType?: string | number;
}

// Base service type
export type BaseService = Record<string, never>;

// Error response type
export interface ApiError {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
    status?: number;
  };
  message?: string;
  status?: number;
}

// Request configuration type
export interface RequestConfig {
  responseType?: "json" | "blob" | "arraybuffer" | "text" | "stream";
  headers?: Record<string, string>;
}

// Generic service method type
export type ServiceMethod<TParams = unknown, TResponse = unknown> = (
  params?: TParams,
  config?: RequestConfig
) => Promise<AxiosResponse<ApiResponse<TResponse>>>;
