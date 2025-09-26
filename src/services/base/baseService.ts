import { AxiosResponse } from "axios";
import { apiClient } from "./apiClient";

/**
 * Generic API response interface
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T | T[];
  total?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  totalItems?: number;
  currentPage?: number;
}

/**
 * Base service class with common CRUD operations
 */
export class BaseService {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic GET request
   */
  async get<T = any>(params?: Record<string, any>) {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(
      this.baseUrl,
      {
        params,
      }
    );
    return response;
  }

  /**
   * Generic GET request by ID
   */
  async getById<T = any>(id: string | number): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(
      `${this.baseUrl}/${id}`
    );
    return response.data;
  }

  /**
   * Generic POST request
   */
  async create<T = any, D = any>(data: D): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(
      this.baseUrl,
      data
    );
    return response.data;
  }

  /**
   * Generic PUT request
   */
  async update<T = any, D = any>(
    id: string | number,
    data: D
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.put(
      `${this.baseUrl}/${id}`,
      data
    );
    return response.data;
  }

  /**
   * Generic PATCH request
   */
  async patch<T = any, D = any>(
    id: string | number,
    data: D
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.patch(
      `${this.baseUrl}/${id}`,
      data
    );
    return response.data;
  }

  /**
   * Generic DELETE request
   */
  async delete<T = any>(id: string | number): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.delete(
      `${this.baseUrl}/${id}`
    );
    return response.data;
  }

  /**
   * Generic POST request with custom endpoint
   */
  async post<T = any, D = any>(
    endpoint: string,
    data: D
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(
      `${this.baseUrl}/${endpoint}`,
      data
    );
    return response.data;
  }

  /**
   * Generic PUT request with custom endpoint
   */
  async put<T = any, D = any>(
    endpoint: string,
    data: D
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.put(
      `${this.baseUrl}/${endpoint}`,
      data
    );
    return response.data;
  }

  /**
   * Generic DELETE request with custom endpoint
   */
  async deleteEndpoint<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.delete(
      `${this.baseUrl}/${endpoint}`
    );
    return response.data;
  }
}

/**
 * Paginated response interface
 */
export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

/**
 * Helper function to create paginated response
 */
export function createPaginatedResponse<T = any>(
  data: T[],
  total: number,
  page: number,
  pageSize: number
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / pageSize);
  return {
    data,
    total,
    page,
    pageSize,
    totalPages,
    totalItems: total,
    currentPage: page,
  };
}

/**
 * Helper function to extract data from API response
 */
export function extractData<T = any>(response: ApiResponse<T>): T {
  return response.data as T;
}

/**
 * Helper function to extract paginated data from API response
 */
export function extractPaginatedData<T = any>(
  response: ApiResponse<PaginatedResponse<T>>
): PaginatedResponse<T> {
  return response.data as PaginatedResponse<T>;
}
