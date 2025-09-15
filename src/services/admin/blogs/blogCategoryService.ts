import { apiClient } from "../../base/apiClient";
import { ENDPOINTS } from "@/constants";
import { ServiceMethod } from "../../base/types";

export class BlogCategoryService {
  // Get all blog categories
  getBlogCategory: ServiceMethod = () => {
    return apiClient.get(ENDPOINTS.BLOG_CATEGORIES.BASE);
  };

  // Get blog categories page
  getBlogCategoryPage: ServiceMethod = () => {
    return apiClient.get(ENDPOINTS.BLOG_CATEGORIES.LIST);
  };

  // Create blog category
  createBlogCategory: ServiceMethod<unknown> = data => {
    return apiClient.post(ENDPOINTS.BLOG_CATEGORIES.BASE, data);
  };

  // Update blog category
  updateBlogCategory: ServiceMethod<{ id: string | number; data: unknown }> =
    params => {
      const { id, data } = params || {};
      return apiClient.put(`${ENDPOINTS.BLOG_CATEGORIES.BASE}/${id}`, data);
    };

  // Delete blog category
  deleteBlogCategory: ServiceMethod<string | number> = id => {
    return apiClient.delete(`${ENDPOINTS.BLOG_CATEGORIES.BASE}/${id}`);
  };
}

// Export singleton instance
export const blogCategoryService = new BlogCategoryService();
