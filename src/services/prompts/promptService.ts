/**
 * Prompt service for API operations
 */

import { apiClient } from "@/services/base/apiClient";
import type { Prompt } from "@/lib/types";

/**
 * Prompt service class
 */
export class PromptService {
  /**
   * Get prompts with pagination and filters
   *
   * @param params - Pagination and filter parameters
   * @returns Promise with prompts data
   */
  async getPromptsPage(params: {
    page: number;
    pageSize: number;
    search?: string;
    categoryId?: string;
    status?: string;
    isPremium?: string;
    tags?: string[];
  }): Promise<{
    data: Prompt[];
    total: number;
    totalPages: number;
  }> {
    const queryParams = new URLSearchParams();
    queryParams.append("page", params.page.toString());
    queryParams.append("pageSize", params.pageSize.toString());

    if (params.search) queryParams.append("search_text", params.search);
    if (params.categoryId && params.categoryId !== "all")
      queryParams.append("category_id", params.categoryId);
    if (params.status && params.status !== "all")
      queryParams.append("status", params.status);
    if (params.isPremium && params.isPremium !== "all")
      queryParams.append("is_type", params.isPremium);
    if (params.tags && params.tags.length > 0) {
      params.tags.forEach(tag => queryParams.append("tags", tag));
    }

    const response = await apiClient.get(`/prompts?${queryParams.toString()}`);
    return response.data;
  }

  /**
   * Get prompt by ID
   *
   * @param id - Prompt ID
   * @returns Promise with prompt data
   */
  async getPromptById(id: string | number): Promise<Prompt> {
    const response = await apiClient.get(`/admin/prompts/${id}`);
    return response.data;
  }

  /**
   * Create new prompt
   *
   * @param promptData - Prompt data
   * @returns Promise with created prompt
   */
  async createPrompt(promptData: {
    title: string;
    content: string;
    categoryId: string;
    tags: string[];
    isPublic: boolean;
    isPremium: boolean;
    description?: string;
    image?: string;
  }): Promise<Prompt> {
    const response = await apiClient.post("/admin/prompts", promptData);
    return response.data;
  }

  /**
   * Update prompt
   *
   * @param id - Prompt ID
   * @param promptData - Updated prompt data
   * @returns Promise with updated prompt
   */
  async updatePrompt(
    id: string | number,
    promptData: {
      title?: string;
      content?: string;
      categoryId?: string;
      tags?: string[];
      isPublic?: boolean;
      isPremium?: boolean;
      description?: string;
      image?: string;
    }
  ): Promise<Prompt> {
    const response = await apiClient.put(`/admin/prompts/${id}`, promptData);
    return response.data;
  }

  /**
   * Delete prompt
   *
   * @param id - Prompt ID
   * @returns Promise with deletion result
   */
  async deletePrompt(id: string | number): Promise<void> {
    await apiClient.delete(`/admin/prompts/${id}`);
  }

  /**
   * Toggle prompt public status
   *
   * @param id - Prompt ID
   * @param isPublic - Public status
   * @returns Promise with updated prompt
   */
  async togglePromptPublic(
    id: string | number,
    isPublic: boolean
  ): Promise<Prompt> {
    const response = await apiClient.patch(
      `/admin/prompts/${id}/toggle-public`,
      { isPublic }
    );
    return response.data;
  }
}

export const promptService = new PromptService();
