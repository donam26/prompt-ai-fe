import { BaseService } from "../../base/baseService";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import type { Subscription } from "@/types";
import type { PaginationParams } from "@/types/services/common";

// Subscription service parameters
export type SubscriptionListParams = PaginationParams;

/**
 * SubscriptionService extending BaseService
 */
export class SubscriptionService extends BaseService {
  constructor() {
    super(ENDPOINTS.SUBSCRIPTIONS.BASE);
  }

  /**
   * Get all subscriptions
   */
  async getSubscriptions(params?: Record<string, unknown>) {
    return this.list(params);
  }

  /**
   * Get subscriptions with pagination
   */
  async getSubscriptionsPage(params?: SubscriptionListParams) {
    const { page = 1, pageSize = 10 } = params || {};
    return this.list({
      [QUERY_PARAMS.PAGE]: page,
      [QUERY_PARAMS.PAGE_SIZE]: pageSize,
    });
  }

  /**
   * Get subscription by ID
   */
  async getSubscription(id: string | number) {
    return this.getById<Subscription>(id);
  }

  /**
   * Create new subscription
   */
  async createSubscription(data: Partial<Subscription>) {
    return this.create<Subscription, Partial<Subscription>>(data);
  }

  /**
   * Update subscription
   */
  async updateSubscription(id: string | number, data: Partial<Subscription>) {
    return this.update<Subscription, Partial<Subscription>>(id, data);
  }

  /**
   * Delete subscription
   */
  async deleteSubscription(id: string | number) {
    return this.delete<void>(id);
  }

  /**
   * Get subscription by duration
   */
  async getSubscriptionByDuration(duration: string) {
    return this.list({ [QUERY_PARAMS.DURATION]: duration });
  }

  /**
   * Get subscription by duration and type
   */
  async getSubscriptionByDurationAndType(duration: string, type: string) {
    return this.list({
      [QUERY_PARAMS.DURATION]: duration,
      type,
    });
  }
}

// Export singleton instance
export const subscriptionService = new SubscriptionService();
