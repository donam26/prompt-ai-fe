import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { Prompt } from "@/lib/types";
import type { ApiResponse } from "@/types/common";

/**
 * PromptService extending BaseService
 */
export class PromptService extends BaseService {
  constructor() {
    super(ENDPOINTS.PROMPTS.BASE);
  }

  async getFavoritePrompts(userId: string | number) {
    return await this.getById(`${ENDPOINTS.PROMPTS.BASE}/favorite/${userId}`);
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
  async deletePrompt(id: string): Promise<ApiResponse<void>> {
    return await this.delete<void>(id);
  }

  /**
   * Toggle prompt public status
   */
  async togglePromptPublic(id: string, isPublic: boolean) {
    return await this.patch<Prompt>(id, { isPublic });
  }

  async addFavoritePrompt(data: { promptId: string; userId: string }) {
    return await this.post<Prompt>(`${ENDPOINTS.PROMPTS.BASE}/favorite`, data);
  }

  async removeFavoritePrompt(promptId: string) {
    return await this.delete(`${ENDPOINTS.PROMPTS.BASE}/favorite/${promptId}`);
  }
}

// Export singleton instance
export const promptService = new PromptService();
