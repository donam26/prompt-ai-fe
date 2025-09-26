import {
  BaseService,
  ApiResponse,
  PaginatedResponse,
} from "@/services/base/baseService";
import type { Blog } from "@/types/admin";

/**
 * Blog service extending BaseService
 */
export class BlogService extends BaseService {
  constructor() {
    super("/admin/blogs");
  }

  /**
   * Get blogs with pagination and filtering
   */
  async getBlogs(params: {
    page?: number;
    pageSize?: number;
    search?: string;
    categoryId?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<ApiResponse<PaginatedResponse<Blog>>> {
    return this.get<PaginatedResponse<Blog>>("", params);
  }

  /**
   * Get blog by ID
   */
  async getBlog(id: string | number): Promise<ApiResponse<Blog>> {
    return this.getById<Blog>(id);
  }

  /**
   * Create new blog
   */
  async createBlog(data: Partial<Blog>): Promise<ApiResponse<Blog>> {
    return this.create<Blog, Partial<Blog>>(data);
  }

  /**
   * Update blog
   */
  async updateBlog(
    id: string | number,
    data: Partial<Blog>
  ): Promise<ApiResponse<Blog>> {
    return this.update<Blog, Partial<Blog>>(id, data);
  }

  /**
   * Delete blog
   */
  async deleteBlog(id: string | number): Promise<ApiResponse<void>> {
    return this.delete<void>(id);
  }

  /**
   * Publish blog
   */
  async publishBlog(id: string | number): Promise<ApiResponse<Blog>> {
    return this.patch<Blog>(id, { status: "published" });
  }

  /**
   * Unpublish blog
   */
  async unpublishBlog(id: string | number): Promise<ApiResponse<Blog>> {
    return this.patch<Blog>(id, { status: "draft" });
  }

  /**
   * Get blog categories
   */
  async getCategories(): Promise<
    ApiResponse<Array<{ id: string; name: string }>>
  > {
    return this.get<Array<{ id: string; name: string }>>("categories");
  }
}

// Export singleton instance
export const blogService = new BlogService();
