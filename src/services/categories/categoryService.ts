import { apiClient } from "../base/apiClient";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import { SearchParams, ServiceMethod } from "../base/types";
import type { PaginationParams } from "@/types/services/common";
import { CreateCategoryRequest } from "@/lib/types";

// Category service parameters
export interface CategoryListParams extends PaginationParams, SearchParams {
  queryParams?: string;
}

export interface CategoryBySectionParams extends SearchParams {
  sectionId: string | number;
  listCategory?: string;
  type?: string;
  industryIds?: string[] | number[];
}

export class CategoryService {
  // Get all categories
  getCategories: ServiceMethod = () => {
    return apiClient.get(ENDPOINTS.CATEGORIES.BASE);
  };

  // Get categories with pagination
  getCategoriesPage: ServiceMethod<CategoryListParams> = params => {
    const { page = 1, pageSize = 10, queryParams = "" } = params || {};

    const url = queryParams
      ? `${ENDPOINTS.CATEGORIES.BASE}?${queryParams}`
      : `${ENDPOINTS.CATEGORIES.BASE}?${QUERY_PARAMS.PAGE}=${page}&${QUERY_PARAMS.PAGE_SIZE}=${pageSize}`;

    return apiClient.get(url);
  };

  // Get category by ID
  getCategoryById: ServiceMethod<string | number> = id => {
    return apiClient.get(`${ENDPOINTS.CATEGORIES.BASE}/${id}`);
  };

  // Get categories by section
  getCategoriesBySection: ServiceMethod<CategoryBySectionParams> = params => {
    const queryParams = new URLSearchParams();

    if (params?.searchTxt) {
      queryParams.append(QUERY_PARAMS.SEARCH_TXT, params.searchTxt);
    }
    if (params?.listCategory) {
      queryParams.append(QUERY_PARAMS.LIST_CATEGORY, params.listCategory);
    }
    if (params?.type) {
      queryParams.append(QUERY_PARAMS.TYPE, params.type);
    }
    if (params?.industryIds && params.industryIds.length > 0) {
      const industryParam = Array.isArray(params.industryIds)
        ? params.industryIds.join(",")
        : String(params.industryIds);
      queryParams.append(QUERY_PARAMS.INDUSTRY_ID, industryParam);
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `${ENDPOINTS.CATEGORIES.BY_SECTION}/${params?.sectionId}?${queryString}`
      : `${ENDPOINTS.CATEGORIES.BY_SECTION}/${params?.sectionId}`;

    return apiClient.get(url);
  };

  // Create category
  createCategory: ServiceMethod<CreateCategoryRequest> = data => {
    return apiClient.post(ENDPOINTS.CATEGORIES.BASE, data);
  };

  // Update category
  updateCategory: ServiceMethod<{
    id: string | number;
    data: Partial<CreateCategoryRequest>;
  }> = ({ id, data } = { id: "", data: {} }) => {
    return apiClient.put(`${ENDPOINTS.CATEGORIES.BASE}/${id}`, data);
  };

  // Delete category
  deleteCategory: ServiceMethod<string | number> = id => {
    return apiClient.delete(`${ENDPOINTS.CATEGORIES.BASE}/${id}`);
  };
}

// Export singleton instance
export const categoryService = new CategoryService();
