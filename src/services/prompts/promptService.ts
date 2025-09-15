import { apiClient, buildUrlWithParams } from "../base/apiClient";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import {
  PaginationParams,
  SearchParams,
  FilterParams,
  ServiceMethod,
} from "../base/types";
import { CreatePromptRequest } from "@/lib/types";

// Prompt service parameters
export interface PromptListParams
  extends PaginationParams,
    SearchParams,
    FilterParams {
  categoryId?: string | number;
  topicId?: string | number;
  industryId?: string | number | string[];
  subType?: string | number;
}

export interface PromptByCategoryParams extends PaginationParams {
  categoryId: string | number;
  topicId?: string | number;
  industryId?: string | number | string[];
  searchText?: string;
  isType?: string | number;
  subType?: string | number;
}

export interface RelatedPromptsParams {
  currentId: string | number;
  categoryId: string | number;
  topicId: string | number;
}

export interface FavoritePromptParams {
  promptId: string | number;
  userId: string | number;
}

export interface FavoritePromptBySectionParams {
  userId: string | number;
  sectionId: string | number;
}

export class PromptService {
  // Get prompts with query string
  getPrompts: ServiceMethod<string> = query => {
    return apiClient.get(`${ENDPOINTS.PROMPTS.BASE}?${query}`);
  };

  // Upload image
  uploadImage: ServiceMethod<FormData> = data => {
    return apiClient.post(ENDPOINTS.PROMPTS.UPLOAD, data);
  };

  // Get prompt by ID
  getPromptById: ServiceMethod<string | number> = id => {
    return apiClient.get(`${ENDPOINTS.PROMPTS.BASE}/${id}`);
  };

  // Create prompt
  createPrompt: ServiceMethod<CreatePromptRequest> = data => {
    return apiClient.post(ENDPOINTS.PROMPTS.BASE, data);
  };

  // Update prompt
  updatePrompt: ServiceMethod<{
    id: string | number;
    data: Partial<CreatePromptRequest>;
  }> = ({ id, data } = { id: "", data: {} }) => {
    return apiClient.put(`${ENDPOINTS.PROMPTS.BASE}/${id}`, data);
  };

  // Delete prompt
  deletePrompt: ServiceMethod<string | number> = id => {
    return apiClient.delete(`${ENDPOINTS.PROMPTS.BASE}/${id}`);
  };

  // Get prompts by category with advanced filtering
  getPromptsByCategoryId: ServiceMethod<PromptByCategoryParams> = params => {
    const queryParams = new URLSearchParams();

    queryParams.append(QUERY_PARAMS.PAGE, String(params?.page || 1));
    queryParams.append(QUERY_PARAMS.PAGE_SIZE, String(params?.pageSize || 12));
    queryParams.append(QUERY_PARAMS.CATEGORY_ID, String(params?.categoryId));

    if (params?.topicId !== undefined) {
      queryParams.append(QUERY_PARAMS.TOPIC_ID, String(params.topicId));
    }

    if (params?.industryId !== undefined) {
      const industryParam = Array.isArray(params.industryId)
        ? params.industryId.join(",")
        : String(params.industryId);
      queryParams.append(QUERY_PARAMS.INDUSTRY_ID, industryParam);
    }

    if (params?.searchText !== undefined) {
      queryParams.append(QUERY_PARAMS.SEARCH_TEXT, params.searchText);
    }

    if (params?.isType !== undefined) {
      queryParams.append(QUERY_PARAMS.IS_TYPE, String(params.isType));
    }

    if (params?.subType !== undefined) {
      queryParams.append(QUERY_PARAMS.SUB_TYPE, String(params.subType));
    }

    return apiClient.get(
      `${ENDPOINTS.PROMPTS.BY_CATEGORY}?${queryParams.toString()}`
    );
  };

  // Get prompts content by category
  getPromptsContentByCategoryId: ServiceMethod<string | number> =
    categoryId => {
      return apiClient.get(
        `${ENDPOINTS.PROMPTS.TOPICS_BY_CATEGORY}?${QUERY_PARAMS.CATEGORY_ID}=${categoryId}`
      );
    };

  // Get newest prompts by category
  getNewestPromptsByCategoryId: ServiceMethod<string | number> = categoryId => {
    return apiClient.get(
      `${ENDPOINTS.PROMPTS.NEWEST}?${QUERY_PARAMS.CATEGORY_ID}=${categoryId}`
    );
  };

  // Get related prompts
  getRelatedPrompts: ServiceMethod<RelatedPromptsParams> = params => {
    const queryParams = new URLSearchParams();
    queryParams.append("current_id", String(params?.currentId));
    queryParams.append(QUERY_PARAMS.CATEGORY_ID, String(params?.categoryId));
    queryParams.append(QUERY_PARAMS.TOPIC_ID, String(params?.topicId));

    return apiClient.get(
      `${ENDPOINTS.PROMPTS.RELATED}?${queryParams.toString()}`
    );
  };

  // Favorite prompts
  getFavoritePrompts: ServiceMethod<string | number> = userId => {
    return apiClient.get(`${ENDPOINTS.PROMPTS.FAVORITE}/${userId}`);
  };

  addFavoritePrompt: ServiceMethod<FavoritePromptParams> = params => {
    return apiClient.post(ENDPOINTS.PROMPTS.FAVORITE, {
      prompt_id: params?.promptId,
      user_id: params?.userId,
    });
  };

  removeFavoritePrompt: ServiceMethod<string | number> = id => {
    return apiClient.delete(`${ENDPOINTS.PROMPTS.FAVORITE}/${id}`);
  };

  getFavoritePromptsByUserId: ServiceMethod<FavoritePromptBySectionParams> =
    params => {
      const queryParams = new URLSearchParams();
      queryParams.append(QUERY_PARAMS.USER_ID, String(params?.userId));
      queryParams.append(QUERY_PARAMS.SECTION_ID, String(params?.sectionId));

      return apiClient.get(
        `${ENDPOINTS.PROMPTS.FAVORITE_BY_SECTION}?${queryParams.toString()}`
      );
    };

  // Toggle favorite (this might need to be implemented based on your API)
  toggleFavorite: ServiceMethod<string | number> = promptId => {
    // This method might need to be adjusted based on your actual API implementation
    return apiClient.post(`${ENDPOINTS.PROMPTS.FAVORITE}/toggle`, {
      prompt_id: promptId,
    });
  };

  // Import/Export
  uploadExcel: ServiceMethod<FormData> = data => {
    return apiClient.post(ENDPOINTS.PROMPTS.IMPORT_EXCEL, data);
  };

  exportPromptsExcel: ServiceMethod<Record<string, unknown>> = (
    filters,
    config
  ) => {
    const queryString =
      buildUrlWithParams(ENDPOINTS.PROMPTS.EXPORT_EXCEL, filters).split(
        "?"
      )[1] || "";
    return apiClient.get(`${ENDPOINTS.PROMPTS.EXPORT_EXCEL}?${queryString}`, {
      responseType: "blob",
      ...config,
    });
  };
}

// Export singleton instance
export const promptService = new PromptService();
