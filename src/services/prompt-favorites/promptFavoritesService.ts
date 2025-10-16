import { ENDPOINTS } from "@/constants/api";
import { BaseService } from "../base/baseService";
import type { Prompt } from "@/types";
import type { BaseApiResponse } from "@/types/api/common";

/**
 * PromptFavoritesService for managing prompt favorites
 */
export class PromptFavoritesService extends BaseService {
  constructor() {
    super(ENDPOINTS.PROMPT_FAVORITES.BASE);
  }

  /**
   * Add a prompt to favorites
   */
  async addFavoritePrompt(data: {
    promptId: string;
    userId: string;
  }): Promise<BaseApiResponse<Prompt>> {
    const response = await this.post<Prompt>("", {
      user_id: Number(data.userId),
      prompt_id: Number(data.promptId),
    });
    return response;
  }

  /**
   * Remove a prompt from favorites by favoriteId
   */
  async removeFavoritePrompt(
    favoriteId: string
  ): Promise<BaseApiResponse<void>> {
    return await this.delete<void>(favoriteId);
  }

  /**
   * Remove a prompt from favorites by promptId and userId
   */
  async removeFavoritePromptByPromptId(
    promptId: string | number,
    userId: string | number
  ): Promise<BaseApiResponse<void>> {
    const endpoint = `${ENDPOINTS.PROMPT_FAVORITES.BASE}/remove`;
    return await this.post<void>(endpoint, {
      prompt_id: Number(promptId),
      user_id: Number(userId),
    });
  }

  /**
   * Get user's favorite prompts
   */
  async getFavoritePrompts(
    userId: string | number
  ): Promise<
    BaseApiResponse<{ id: number; userId: number; promptId: number }[]>
  > {
    const endpoint = `${ENDPOINTS.PROMPT_FAVORITES.BASE}/${userId}`;
    return await this.get<{ id: number; userId: number; promptId: number }[]>(
      endpoint
    );
  }

  /**
   * Check if a prompt is favorited by user
   */
  async isPromptFavorited(
    userId: string | number,
    promptId: string | number
  ): Promise<BaseApiResponse<boolean>> {
    return await this.get<boolean>(
      `/check?user_id=${userId}&prompt_id=${promptId}`
    );
  }

  /**
   * Get favorite prompts by section
   */
  async getFavoritePromptsBySection(
    userId: string | number,
    sectionId: string | number
  ): Promise<BaseApiResponse<Prompt[]>> {
    return await this.get<Prompt[]>(
      `/by-section?user_id=${userId}&section_id=${sectionId}`
    );
  }

  /**
   * Get all favorite prompts for a user
   */
  async getAllFavoritePrompts(
    userId: string | number
  ): Promise<BaseApiResponse<Prompt[]>> {
    return await this.get<Prompt[]>(
      `${ENDPOINTS.PROMPT_FAVORITES.BASE}/${userId}`
    );
  }

  /**
   * Get favorite items with pagination
   */
  async getFavoriteItemsWithPagination(
    userId: string | number,
    page: number = 1,
    pageSize: number = 10
  ): Promise<
    BaseApiResponse<{
      data: {
        id: number;
        userId: number;
        promptId: number;
        prompt: Prompt;
      }[];
      pagination: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
      };
    }>
  > {
    const endpoint = `${ENDPOINTS.PROMPT_FAVORITES.BASE}/${userId}?page=${page}&pageSize=${pageSize}`;
    return await this.get<{
      data: {
        id: number;
        userId: number;
        promptId: number;
        prompt: Prompt;
      }[];
      pagination: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
      };
    }>(endpoint);
  }
}

// Export singleton instance
export const promptFavoritesService = new PromptFavoritesService();
