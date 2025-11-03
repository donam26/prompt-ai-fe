import { BaseService } from "../base/baseService";
import { ENDPOINTS } from "@/constants";

/**
 * Feedback service interface
 */
export interface FeedbackData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
}

/**
 * UserFeedbackService extending BaseService (for user-facing feedback submission)
 */
export class UserFeedbackService extends BaseService {
  constructor() {
    super(ENDPOINTS.FEEDBACK.BASE);
  }

  /**
   * Submit feedback
   */
  async submitFeedback(data: FeedbackData) {
    return this.create(data);
  }
}

// Export singleton instance
export const userFeedbackService = new UserFeedbackService();
