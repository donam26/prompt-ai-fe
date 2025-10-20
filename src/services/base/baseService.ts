import { AxiosResponse } from "axios";
import { apiClient } from "./apiClient";
import { BaseApiResponse, PaginatedApiResponse } from "@/types/api/common";

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
    // Convert camelCase params to snake_case for API
    const snakeParams = params ? params : undefined;

    const response: AxiosResponse<PaginatedApiResponse<T>> =
      await apiClient.get(this.baseUrl, {
        params: snakeParams,
      });

    return response;
  }

  /**
   * Generic GET request by ID
   */
  async getById<T = any>(id: string | number): Promise<BaseApiResponse<T>> {
    const response: AxiosResponse<BaseApiResponse<T>> = await apiClient.get(
      `${this.baseUrl}/${id}`
    );

    return response.data;
  }

  /**
   * Generic POST request
   */
  async create<T = any, D = any>(data: D): Promise<BaseApiResponse<T>> {
    const response: AxiosResponse<BaseApiResponse<T>> = await apiClient.post(
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
  ): Promise<BaseApiResponse<T>> {
    const response: AxiosResponse<BaseApiResponse<T>> = await apiClient.put(
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
  ): Promise<BaseApiResponse<T>> {
    const response: AxiosResponse<BaseApiResponse<T>> = await apiClient.patch(
      `${this.baseUrl}/${id}`,
      data
    );

    return response.data;
  }

  /**
   * Generic DELETE request
   */
  async delete<T = any>(id: string | number): Promise<BaseApiResponse<T>> {
    const response: AxiosResponse<BaseApiResponse<T>> = await apiClient.delete(
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
  ): Promise<BaseApiResponse<T>> {
    const response: AxiosResponse<BaseApiResponse<T>> = await apiClient.post(
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
  ): Promise<BaseApiResponse<T>> {
    const response: AxiosResponse<BaseApiResponse<T>> = await apiClient.put(
      `${this.baseUrl}/${endpoint}`,
      data
    );

    return response.data;
  }

  async get<T = any>(endpoint: string): Promise<BaseApiResponse<T>> {
    const response: AxiosResponse<BaseApiResponse<T>> = await apiClient.get(
      `${endpoint}`
    );
    return response.data;
  }

  /**
   * Generic DELETE request with custom endpoint
   */
  async deleteEndpoint<T = any>(endpoint: string): Promise<BaseApiResponse<T>> {
    const response: AxiosResponse<BaseApiResponse<T>> = await apiClient.delete(
      `${this.baseUrl}/${endpoint}`
    );
    return response.data;
  }

  async exportExcel(
    endpoint: string,
    filters: Record<string, unknown> = {}
  ): Promise<Blob> {
    const { applyNonEmptyFiltersToQuery } = await import("@/utils");
    const queryParams = new URLSearchParams();

    // Filter out empty/null/all values using shared utility
    const filteredParams: Record<string, unknown> = {};
    applyNonEmptyFiltersToQuery(filters, filteredParams);

    // Build query string from filtered params
    Object.entries(filteredParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => queryParams.append(`${key}[]`, item.toString()));
      } else {
        queryParams.append(key, String(value));
      }
    });

    // Add export format
    queryParams.append("format", "excel");

    const queryString = queryParams.toString();
    const fullEndpoint = queryString ? `${endpoint}?${queryString}` : endpoint;

    const response = await apiClient.get(`${this.baseUrl}/${fullEndpoint}`, {
      responseType: "blob",
      headers: {
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });

    return response.data as Blob;
  }

  /**
   * Helper method to download blob as file
   * @param blob - Blob data
   * @param filename - Filename for download
   */
  downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.setAttribute("data-ignore-nprogress", "true");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }
}
