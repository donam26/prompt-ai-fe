import { BaseService } from "../../base/baseService";
import { ENDPOINTS } from "@/constants";
import type { Industry } from "@/types";

/**
 * IndustryService extending BaseService
 */
export class IndustryService extends BaseService {
  constructor() {
    super(ENDPOINTS.INDUSTRIES.BASE);
  }

  /**
   * Get all industries
   */
  async getIndustries(params?: Record<string, unknown>) {
    return this.list(params);
  }

  async getIndustriesPageWithQueryString(queryString: string) {
    const { apiClient } = await import("../../base/apiClient");
    const response = await apiClient.get(`${this.baseUrl}?${queryString}`);
    return response;
  }

  /**
   * Get industry by ID
   */
  async getIndustryById(id: string | number) {
    const response = await this.getById<Industry>(id);
    return {
      success: response.success,
      data: response.data,
    };
  }

  /**
   * Create industry
   */
  async createIndustry(data: Partial<Industry>) {
    return await this.create<Industry, Partial<Industry>>(data);
  }

  /**
   * Update industry
   */
  async updateIndustry(id: string | number, data: Partial<Industry>) {
    return await this.update<Industry, Partial<Industry>>(id, data);
  }

  /**
   * Delete industry
   */
  async deleteIndustry(id: string | number) {
    return await this.delete<void>(id);
  }
}

// Export singleton instance
export const industryService = new IndustryService();
