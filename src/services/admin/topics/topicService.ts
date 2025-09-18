import { apiClient } from "../../base/apiClient";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import { PaginationParams, ServiceMethod } from "../../base/types";

// Topic service parameters
export type TopicListParams = PaginationParams;

export class TopicService {
  // Get all topics
  getTopics: ServiceMethod = () => {
    return apiClient.get(ENDPOINTS.TOPICS.BASE);
  };

  // Get topics with pagination
  getTopicsPage: ServiceMethod<TopicListParams> = params => {
    const { page = 1, pageSize = 10 } = params || {};
    return apiClient.get(
      `${ENDPOINTS.TOPICS.LIST}?${QUERY_PARAMS.PAGE}=${page}&${QUERY_PARAMS.PAGE_SIZE}=${pageSize}`
    );
  };

  // Create topic
  createTopics: ServiceMethod<unknown> = data => {
    return apiClient.post(ENDPOINTS.TOPICS.BASE, data);
  };

  // Update topic
  updateTopics: ServiceMethod<{ id: string | number; data: unknown }> =
    params => {
      const { id, data } = params || {};
      return apiClient.put(`${ENDPOINTS.TOPICS.BASE}/${id}`, data);
    };

  // Delete topic
  deleteTopics: ServiceMethod<string | number> = id => {
    return apiClient.delete(`${ENDPOINTS.TOPICS.BASE}/${id}`);
  };
}

// Export singleton instance
export const topicService = new TopicService();
