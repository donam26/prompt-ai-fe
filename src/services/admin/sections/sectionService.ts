import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { Section } from "@/lib/types";
import type { ApiResponse } from "@/types/common";

/**
 * SectionService extending BaseService
 */
export class SectionService extends BaseService {
  constructor() {
    super(ENDPOINTS.SECTIONS.BASE);
  }

  /**
   * Get sections with pagination and filtering
   */
  async getSectionsPage(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get section by ID
   */
  async getSection(id: string | number) {
    const response = await this.getById<Section>(id);
    return {
      success: response.success,
      data: response.data,
    };
  }

  /**
   * Create new section
   */
  async createSection(data: Partial<Section>) {
    return await this.create<Section, Partial<Section>>(data);
  }

  /**
   * Update section
   */
  async updateSection(id: string | number, data: Partial<Section>) {
    return await this.update<Section, Partial<Section>>(id, data);
  }

  /**
   * Delete section
   */
  async deleteSection(id: string | number): Promise<ApiResponse<void>> {
    return await this.delete<void>(id);
  }
}

// Export singleton instance
export const sectionService = new SectionService();
