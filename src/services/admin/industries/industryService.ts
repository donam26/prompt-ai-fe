import { apiClient } from "../../base/apiClient";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import {
  PaginationParams,
  SearchParams,
  ServiceMethod,
} from "../../base/types";

// Industry service parameters
export interface IndustryListParams extends PaginationParams, SearchParams {}

export class IndustryService {
  // Get all industries
  getIndustries: ServiceMethod = () => {
    return apiClient.get(ENDPOINTS.INDUSTRIES.BASE);
  };

  // Get industries with pagination
  getIndustriesPage: ServiceMethod<IndustryListParams> = params => {
    const { page = 1, pageSize = 10, search = "" } = params || {};
    const url = search
      ? `${ENDPOINTS.INDUSTRIES.BASE}?${QUERY_PARAMS.PAGE}=${page}&${QUERY_PARAMS.PAGE_SIZE}=${pageSize}&${QUERY_PARAMS.SEARCH}=${search}`
      : `${ENDPOINTS.INDUSTRIES.BASE}?${QUERY_PARAMS.PAGE}=${page}&${QUERY_PARAMS.PAGE_SIZE}=${pageSize}`;
    return apiClient.get(url);
  };

  // Get industry by ID
  getIndustryById: ServiceMethod<string | number> = id => {
    return apiClient.get(`${ENDPOINTS.INDUSTRIES.BASE}/${id}`);
  };

  // Create industry
  createIndustry: ServiceMethod<unknown> = data => {
    return apiClient.post(ENDPOINTS.INDUSTRIES.BASE, data);
  };

  // Update industry
  updateIndustry: ServiceMethod<{ id: string | number; data: unknown }> =
    params => {
      const { id, data } = params || {};
      return apiClient.put(`${ENDPOINTS.INDUSTRIES.BASE}/${id}`, data);
    };

  // Delete industry
  deleteIndustry: ServiceMethod<string | number> = id => {
    return apiClient.delete(`${ENDPOINTS.INDUSTRIES.BASE}/${id}`);
  };
}

// Export singleton instance
export const industryService = new IndustryService();
