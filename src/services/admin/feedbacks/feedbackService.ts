import { BaseService } from "../../base/baseService";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import type { Feedback, PaginationParams } from "@/types";

// Feedback service parameters
export interface FeedbackListParams extends PaginationParams {
  readonly status?: number | string;
}

/**
 * FeedbackService extending BaseService
 */
export class FeedbackService extends BaseService {
  constructor() {
    super(ENDPOINTS.FEEDBACK.BASE);
  }

  /**
   * Get all feedbacks
   */
  async getFeedbacks(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get feedbacks with pagination
   */
  async getFeedbacksPage(params?: FeedbackListParams) {
    const { pageIndex = 1, pageSize = 10, status } = params || {};
    const queryParams: Record<string, unknown> = {
      [QUERY_PARAMS.PAGE]: pageIndex,
      [QUERY_PARAMS.PAGE_SIZE]: pageSize,
    };

    if (status !== undefined && status !== null && status !== "") {
      queryParams[QUERY_PARAMS.STATUS] = status;
    }

    return this.list(queryParams);
  }

  /**
   * Get feedback by ID
   */
  async getFeedback(id: string | number) {
    return this.getById<Feedback>(id);
  }

  /**
   * Create new feedback
   */
  async createFeedback(data: Partial<Feedback>) {
    return this.create<Feedback, Partial<Feedback>>(data);
  }

  /**
   * Update feedback
   */
  async updateFeedback(id: string | number, data: Partial<Feedback>) {
    return this.update<Feedback, Partial<Feedback>>(id, data);
  }

  /**
   * Delete feedback
   */
  async deleteFeedback(id: string | number) {
    return this.delete<void>(id);
  }

  /**
   * Reply to feedback
   */
  async replyFeedback(id: string | number, reply: string) {
    return this.patch(`${id}/reply`, { reply });
  }
}

// Export singleton instance
export const feedbackService = new FeedbackService();
