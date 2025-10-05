import { BaseService } from "../base/baseService";
import { Blog, BlogListResponse, BlogFilters } from "@/types/entities/blog";

export class BlogService extends BaseService {
  constructor() {
    super("blogs");
  }

  /**
   * Get paginated blog list
   */
  async getBlogs(filters: BlogFilters = {}): Promise<BlogListResponse> {
    const params = new URLSearchParams();

    if (filters.page) params.append("page", filters.page.toString());
    if (filters.pageSize)
      params.append("pageSize", filters.pageSize.toString());
    if (filters.search) params.append("search", filters.search);
    if (filters.category_id)
      params.append("category_id", filters.category_id.toString());
    if (filters.status) params.append("status", filters.status);
    if (filters.author_id)
      params.append("author_id", filters.author_id.toString());
    if (filters.tags?.length) params.append("tags", filters.tags.join(","));
    if (filters.sort_by) params.append("sort_by", filters.sort_by);
    if (filters.sort_order) params.append("sort_order", filters.sort_order);

    const response = await this.get(`?${params.toString()}`);
    return response.data;
  }

  /**
   * Get blog by ID
   */
  async getBlogById(id: number): Promise<Blog> {
    const response = await this.get(`/${id}`);
    return response.data;
  }

  /**
   * Get blog by slug
   */
  async getBlogBySlug(slug: string): Promise<Blog> {
    const response = await this.get(`/slug/${slug}`);
    return response.data;
  }

  /**
   * Get published blogs only
   */
  async getPublishedBlogs(
    filters: Omit<BlogFilters, "status"> = {}
  ): Promise<BlogListResponse> {
    return this.getBlogs({ ...filters, status: "published" });
  }

  /**
   * Get blog categories
   */
  async getBlogCategories() {
    const response = await this.get("/categories");
    return response.data;
  }

  /**
   * Get blog tags
   */
  async getBlogTags() {
    const response = await this.get("/tags");
    return response.data;
  }

  /**
   * Increment blog view count
   */
  async incrementViewCount(id: number): Promise<void> {
    await this.post(`/${id}/view`);
  }

  /**
   * Like/Unlike blog
   */
  async toggleLike(
    id: number
  ): Promise<{ liked: boolean; like_count: number }> {
    const response = await this.post(`/${id}/like`);
    return response.data;
  }
}
