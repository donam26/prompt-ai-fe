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
    const blob = await this.exportExcel("export-excel", filters);
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `prompts-export-${timestamp}.xlsx`;
    this.downloadBlob(blob, filename);
    return blob;
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
}

// Export singleton instance
export const promptService = new PromptService();
