import { apiClient } from "../base/apiClient";
import { ENDPOINTS } from "@/constants";
import { ServiceMethod } from "../base/types";

export class SectionService {
  // Get all sections
  getSections: ServiceMethod = () => {
    return apiClient.get(ENDPOINTS.SECTIONS.BASE);
  };
}

// Export singleton instance
export const sectionService = new SectionService();
