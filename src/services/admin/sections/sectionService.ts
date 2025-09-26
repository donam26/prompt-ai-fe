import { apiClient } from "@/services/base/apiClient";
import type { Section } from "@/lib/types";

/**
 * Service for managing sections
 */
export const sectionService = {
  /**
   * Get sections with pagination and filtering
   */
  async getSectionsPage(params: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: string;
  }) {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append("page", params.page.toString());
    if (params.pageSize)
      searchParams.append("pageSize", params.pageSize.toString());
    if (params.search) searchParams.append("search", params.search);
    if (params.status && params.status !== "all")
      searchParams.append("status", params.status);

    const queryString = searchParams.toString();
    const url = `/admin/sections${queryString ? `?${queryString}` : ""}`;

    return apiClient.get(url);
  },

  /**
   * Get a single section by ID
   */
  async getSection(id: string | number): Promise<Section> {
    const response = await apiClient.get(`/admin/sections/${id}`);
    return response.data;
  },

  /**
   * Create a new section
   */
  async createSection(data: Partial<Section>): Promise<Section> {
    const response = await apiClient.post("/admin/sections", data);
    return response.data;
  },

  /**
   * Update an existing section
   */
  async updateSection(
    id: string | number,
    data: Partial<Section>
  ): Promise<Section> {
    const response = await apiClient.put(`/admin/sections/${id}`, data);
    return response.data;
  },

  /**
   * Delete a section
   */
  async deleteSection(id: string | number): Promise<void> {
    await apiClient.delete(`/admin/sections/${id}`);
  },
};
