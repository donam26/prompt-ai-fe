import { apiClient } from "../../base/apiClient";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import { SearchParams, ServiceMethod } from "../../base/types";
import type { PaginationParams } from "@/types/services/common";
// Blog service parameters
export interface BlogListParams extends PaginationParams, SearchParams {}

export class BlogService {
  // Get blog by ID
  getBlogById: ServiceMethod<string | number> = id => {
    return apiClient.get(`${ENDPOINTS.BLOGS.BASE}/${id}`);
  };

  // Get blogs with pagination
  getBlogPage: ServiceMethod<BlogListParams> = params => {
    const { page = 1, pageSize = 10, search } = params || {};
    return apiClient.get(
      `${ENDPOINTS.BLOGS.LIST}?${QUERY_PARAMS.PAGE}=${page}&${QUERY_PARAMS.PAGE_SIZE}=${pageSize}&search=${search || ""}`
    );
  };

  // Create blog
  createBlog: ServiceMethod<unknown> = data => {
    return apiClient.post(ENDPOINTS.BLOGS.BASE, data);
  };

  // Update blog
  updateBlog: ServiceMethod<{ id: string | number; data: unknown }> =
    params => {
      const { id, data } = params || {};
      return apiClient.put(`${ENDPOINTS.BLOGS.BASE}/${id}`, data);
    };

  // Delete blog
  deleteBlog: ServiceMethod<string | number> = id => {
    return apiClient.delete(`${ENDPOINTS.BLOGS.BASE}/${id}`);
  };
}

// Export singleton instance
export const blogService = new BlogService();
