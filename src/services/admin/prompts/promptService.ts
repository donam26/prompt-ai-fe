import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { Prompt } from "@/types";
import type { BaseApiResponse } from "@/types/api/common";

/**
 * PromptService extending BaseService
 */
export class PromptService extends BaseService {
  constructor() {
    super(ENDPOINTS.PROMPTS.BASE);
  }

  async getPromptsByCategoryId(params?: Record<string, unknown>) {
    return await this.list(params);
  }

  /**
   * Get prompts with pagination and filters
   */
  async getPromptsPage(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get prompts with query string for proper array handling
   */
  async getPromptsPageWithQueryString(queryString: string) {
    const { apiClient } = await import("../../base/apiClient");
    const response = await apiClient.get(`${this.baseUrl}?${queryString}`);
    return response;
  }

  /**
   * Get prompt by ID
   */
  async getPromptById(id: string | number) {
    const response = await this.getById<Prompt>(id);
    return {
      success: response.success,
      data: response.data,
    };
  }

  /**
   * Get prompt by ID with industries included
   */
  async getPromptByIdWithIndustries(id: string | number) {
    const { apiClient } = await import("../../base/apiClient");
    const response = await apiClient.get(
      `${this.baseUrl}/${id}?include=industries`
    );
    return {
      success: true,
      data: response.data,
    };
  }

  /**
   * Create new prompt
   */
  async createPrompt(data: Partial<Prompt>) {
    return await this.create<Prompt, Partial<Prompt>>(data);
  }

  /**
   * Update prompt
   */
  async updatePrompt(id: string, data: Partial<Prompt>) {
    return await this.update<Prompt, Partial<Prompt>>(id, data);
  }

  /**
   * Delete prompt
   */
  async deletePrompt(id: string): Promise<BaseApiResponse<void>> {
    return await this.delete<void>(id);
  }

  /**
   * Toggle prompt public status
   */
  async togglePromptPublic(id: string, isPublic: boolean) {
    return await this.patch<Prompt>(id, { isPublic });
  }

  /**
   * Export prompts to Excel
   */
  async exportPromptsExcel(filters: Record<string, unknown> = {}) {
    const { apiClient } = await import("../../base/apiClient");

    // Build query string from filters
    const queryParams = new URLSearchParams();

    // Add filters to query parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          // Handle array values - add each item separately
          value.forEach(item => {
            queryParams.append(key, item.toString());
          });
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    const queryString = queryParams.toString();
    const url = `${this.baseUrl}/export-excel${queryString ? `?${queryString}` : ""}`;

    const response = await apiClient.get(url, {
      responseType: "blob",
    });

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `prompts-export-${timestamp}.xlsx`;

    // Download the blob
    this.downloadBlob(response.data, filename);

    return response.data;
  }

  /**
   * Get topics by category ID
   */
  async getTopicsByCategoryId(categoryId: string | number) {
    return await this.get(
      `${ENDPOINTS.PROMPTS.TOPICS_BY_CATEGORY}?categoryId=${categoryId}`
    );
  }

  /**
   * Get topics assigned to the selected industries within a category.
   * Empty industryIds -> backend returns all topics of the category.
   */
  async getTopicsByIndustry(
    categoryId: string | number,
    industryIds: (string | number)[]
  ) {
    const query = `categoryId=${categoryId}&industryIds=${industryIds.join(
      ","
    )}&pageSize=1000`;
    return await this.get(`${ENDPOINTS.PROMPTS.TOPICS_BY_INDUSTRY}?${query}`);
  }

  /**
   * Get newest prompts by category ID
   */
  async getNewestPromptsByCategoryId(categoryId: string | number) {
    return await this.get(
      `${ENDPOINTS.PROMPTS.NEWEST}?categoryId=${categoryId}`
    );
  }

  /**
   * Get latest prompts with pagination and filters
   * @param params - Query parameters (accepts both camelCase and snake_case)
   */
  async getLatestPrompts(params?: Record<string, unknown>) {
    const { apiClient } = await import("../../base/apiClient");
    return await apiClient.get(ENDPOINTS.PROMPTS.LATEST, { params });
  }

  /**
   * Bulk update subType for prompts
   */
  async bulkUpdateSubType(
    promptIds: number[],
    subType: number
  ): Promise<BaseApiResponse<void>> {
    const { apiClient } = await import("../../base/apiClient");
    const response = await apiClient.put(`${this.baseUrl}/bulk-subType`, {
      promptIds,
      subType,
    });
    return {
      success: true,
      data: response.data,
    };
  }

  /**
   * Bulk delete prompts
   */
  async bulkDeletePrompts(promptIds: number[]): Promise<BaseApiResponse<void>> {
    const { apiClient } = await import("../../base/apiClient");
    const response = await apiClient.delete(`${this.baseUrl}/bulk`, {
      data: { promptIds },
    });
    return {
      success: true,
      data: response.data,
    };
  }

  /**
   * Import prompts from Excel file
   */
  async importPromptsFromExcel(file: File) {
    const formData = new FormData();
    formData.append("excelFile", file);

    const baseURL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
    const response = await fetch(`${baseURL}/prompts/import-excel`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to import prompts from Excel");
    }

    return response.json();
  }
}

// Export singleton instance
export const promptService = new PromptService();
