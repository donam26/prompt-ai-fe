import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { Category } from "@/lib/types";
import type { ApiResponse } from "../../base";

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
  async getCategories() {
    return this.get<Category[]>();
  }

  /**
   * Get categories with pagination and filtering
   */
  async getCategoriesPage(params?: Record<string, any>) {
    return await this.get(params);
  }

  /**
   * Get category by ID
   */
  async getCategory(id: string | number): Promise<ApiResponse<Category>> {
    const response = await this.getById<Category>(id);
    return {
      success: response.success,
      data: response.data,
    };
  }

  /**
   * Create new category
   */
  async createCategory(
    data: Partial<Category>
  ): Promise<ApiResponse<Category>> {
    const response = await this.create<Category, Partial<Category>>(data);
    return {
      success: response.success,
      data: response.data,
    };
  }

  /**
   * Update category
   */
  async updateCategory(
    id: string | number,
    data: Partial<Category>
  ): Promise<ApiResponse<Category>> {
    const response = await this.update<Category, Partial<Category>>(id, data);
    return {
      success: response.success,
      data: response.data,
    };
  }

  /**
   * Delete category
   */
  async deleteCategory(id: string | number): Promise<ApiResponse<void>> {
    return await this.delete<void>(id);
  }

  /**
   * Get categories by section
   */
  async getCategoriesBySection(sectionId: string | number) {
    return await this.get({ sectionId });
  }

  /**
   * Get categories by industry
   */
  async getCategoriesByIndustry(industryId: string | number) {
    return await this.get({ industryId });
  }

  /**
   * Toggle category status
   */
  async toggleCategoryStatus(
    id: string | number
  ): Promise<ApiResponse<Category>> {
    const response = await this.patch<Category>(id, {});
    return {
      success: response.success,
      data: response.data,
    };
  }
}

// Export singleton instance
export const categoryService = new CategoryService();
