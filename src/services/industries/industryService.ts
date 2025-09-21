import { apiClient } from "../base/apiClient";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import { ServiceMethod } from "../base/types";
import type { PaginationParams } from "@/types/services/common";

// Industry service parameters
export interface IndustryListParams extends PaginationParams {
  queryParams?: string;
}

export class IndustryService {
  // Get all industries
  getIndustries: ServiceMethod = () => {
    return apiClient.get(ENDPOINTS.INDUSTRIES.BASE);
  };

  // Get industries with pagination
  getIndustriesPage: ServiceMethod<IndustryListParams> = params => {
    const { page = 1, pageSize = 10, queryParams = "" } = params || {};

    const queryParamsObj = new URLSearchParams();

    // Add pagination
    queryParamsObj.append(QUERY_PARAMS.PAGE, String(page));
    queryParamsObj.append(QUERY_PARAMS.PAGE_SIZE, String(pageSize));

    // Add search query
    if (queryParams) {
      queryParamsObj.append(QUERY_PARAMS.SEARCH_TXT, queryParams);
    }

    const queryString = queryParamsObj.toString();
    const url = `${ENDPOINTS.INDUSTRIES.BASE}?${queryString}`;

    return apiClient.get(url);
  };

  // Get industry by ID
  getIndustryById: ServiceMethod<string | number> = id => {
    return apiClient.get(`${ENDPOINTS.INDUSTRIES.BASE}/${id}`);
  };

  // Create industry
  createIndustry: ServiceMethod<any> = data => {
    return apiClient.post(ENDPOINTS.INDUSTRIES.BASE, data);
  };

  // Update industry
  updateIndustry: ServiceMethod<{
    id: string | number;
    data: any;
  }> = ({ id, data } = { id: "", data: {} }) => {
    return apiClient.put(`${ENDPOINTS.INDUSTRIES.BASE}/${id}`, data);
  };

  // Delete industry
  deleteIndustry: ServiceMethod<string | number> = id => {
    return apiClient.delete(`${ENDPOINTS.INDUSTRIES.BASE}/${id}`);
  };
}

// Export singleton instance
export const industryService = new IndustryService();
