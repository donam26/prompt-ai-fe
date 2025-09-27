import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { Category } from "@/lib/types";
import type { ApiResponse } from "@/types/common";

/**
 * CategoryService extending BaseService
 */
export class CategoryService extends BaseService {
  constructor() {
    super(ENDPOINTS.CATEGORIES.BASE);
  }

  /**
   * Get all categories
   */
  async getCategories(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get category by ID
   */
  async getCategory(id: string | number) {
    const response = await this.getById<Category>(id);
    return {
      success: response.success,
      data: response.data,
    };
  }

  /**
   * Create new category
   */
  async createCategory(data: Partial<Category>) {
    return await this.create<Category, Partial<Category>>(data);
  }

  /**
   * Update category
   */
  async updateCategory(id: string | number, data: Partial<Category>) {
    return await this.update<Category, Partial<Category>>(id, data);
  }

  /**
   * Delete category
   */
  async deleteCategory(id: string | number): Promise<ApiResponse<void>> {
    return await this.delete<void>(id);
  }
}

// Export singleton instance
export const categoryService = new CategoryService();
