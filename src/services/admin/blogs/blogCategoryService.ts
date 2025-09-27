import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { BlogCategory } from "@/lib/types";

/**
 * BlogCategoryService extending BaseService
 */
export class BlogCategoryService extends BaseService {
  constructor() {
    super(ENDPOINTS.BLOG_CATEGORIES.BASE);
  }

  /**
   * Get all blog categories
   */
  async getBlogCategories(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get blog categories with pagination
   */
  async getBlogCategoriesPage(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get blog category by ID
   */
  async getBlogCategory(id: string | number) {
    return this.getById(id);
  }

  /**
   * Create new blog category
   */
  async createBlogCategory(data: Partial<BlogCategory>) {
    return this.create(data);
  }

  /**
   * Update blog category
   */
  async updateBlogCategory(id: string | number, data: Partial<BlogCategory>) {
    return this.update(id, data);
  }

  /**
   * Delete blog category
   */
  async deleteBlogCategory(id: string) {
    return this.delete<void>(id);
  }
}

// Export singleton instance
export const blogCategoryService = new BlogCategoryService();
