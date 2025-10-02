import { BaseService } from "../../base/baseService";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import type { Subscription, PaginationParams } from "@/types";

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
    const { pageIndex = 1, pageSize = 10 } = params || {};
    return this.list({
      [QUERY_PARAMS.PAGE]: pageIndex,
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
}

// Export singleton instance
export const subscriptionService = new SubscriptionService();
