import { BaseService } from "../../base/baseService";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import type { Topic, PaginationParams } from "@/types";

// Topic service parameters
export type TopicListParams = PaginationParams;

/**
 * TopicService extending BaseService
 */
export class TopicService extends BaseService {
  constructor() {
    super(ENDPOINTS.TOPICS.BASE);
  }

  /**
   * Get all topics
   */
  async getTopics(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get topics with pagination
   */
  async getTopicsPage(params?: TopicListParams) {
    const { pageIndex = 1, pageSize = 10 } = params || {};
    return this.list({
      [QUERY_PARAMS.PAGE]: pageIndex,
      [QUERY_PARAMS.PAGE_SIZE]: pageSize,
    });
  }

  /**
   * Get topic by ID
   */
  async getTopic(id: string | number) {
    return this.getById<Topic>(id);
  }

  /**
   * Create new topic
   */
  async createTopic(data: Partial<Topic>) {
    return this.create<Topic, Partial<Topic>>(data);
  }

  /**
   * Update topic
   */
  async updateTopic(id: string | number, data: Partial<Topic>) {
    return this.update<Topic, Partial<Topic>>(id, data);
  }

  /**
   * Delete topic
   */
  async deleteTopic(id: string | number) {
    return this.delete<void>(id);
  }
}

// Export singleton instance
export const topicService = new TopicService();
