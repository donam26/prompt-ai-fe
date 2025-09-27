import { AxiosResponse } from "axios";
import { apiClient } from "./apiClient";
import { ApiResponse } from "@/types/common";

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
  async list<T = any>(params?: Record<string, unknown>) {
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
