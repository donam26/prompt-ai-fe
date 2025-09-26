import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { BlogCategory } from "@/lib/types";
import type {
  ApiResponse,
  PaginatedResponse,
  SingleResponse,
} from "../../base";

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
  async getBlogCategories(): Promise<ApiResponse<BlogCategory[]>> {
    return this.get<BlogCategory[]>("");
  }

  /**
   * Get blog categories with pagination
   */
  async getBlogCategoriesPage(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
  }): Promise<ApiResponse<PaginatedResponse<BlogCategory>>> {
    return this.get<PaginatedResponse<BlogCategory>>("", params);
  }

  /**
   * Get blog category by ID
   */
  async getBlogCategory(
    id: string | number
  ): Promise<ApiResponse<SingleResponse<BlogCategory>>> {
    return this.getById<SingleResponse<BlogCategory>>(id);
  }

  /**
   * Create new blog category
   */
  async createBlogCategory(
    data: Partial<BlogCategory>
  ): Promise<ApiResponse<SingleResponse<BlogCategory>>> {
    return this.create<SingleResponse<BlogCategory>, Partial<BlogCategory>>(
      data
    );
  }

  /**
   * Update blog category
   */
  async updateBlogCategory(
    id: string | number,
    data: Partial<BlogCategory>
  ): Promise<ApiResponse<SingleResponse<BlogCategory>>> {
    return this.update<SingleResponse<BlogCategory>, Partial<BlogCategory>>(
      id,
      data
    );
  }

  /**
   * Delete blog category
   */
  async deleteBlogCategory(id: string | number): Promise<ApiResponse<void>> {
    return this.delete<void>(id);
  }
}

// Export singleton instance
export const blogCategoryService = new BlogCategoryService();
