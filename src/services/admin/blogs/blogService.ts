import { BaseService } from "@/services/base/baseService";
import type { Blog } from "@/types/entities/blog";

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
  async getBlogs(params: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get blog by ID
   */
  async getBlog(id: string | number) {
    return this.getById<Blog>(id);
  }

  /**
   * Create new blog
   */
  async createBlog(data: Partial<Blog>) {
    return this.create<Blog, Partial<Blog>>(data);
  }

  /**
   * Update blog
   */
  async updateBlog(id: string | number, data: Partial<Blog>) {
    return this.update<Blog, Partial<Blog>>(id, data);
  }

  /**
   * Delete blog
   */
  async deleteBlog(id: string | number) {
    return this.delete<void>(id);
  }

  /**
   * Get blog categories
   */
  async getCategories() {
    return this.list<Array<{ id: string; name: string }>>();
  }
}

// Export singleton instance
export const blogService = new BlogService();
