import { apiClient } from "../../base/apiClient";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import { PaginationParams, ServiceMethod } from "../../base/types";

// Subscription service parameters
export interface SubscriptionListParams extends PaginationParams {}

export class SubscriptionService {
  // Get subscriptions with pagination
  getSubPage: ServiceMethod<SubscriptionListParams> = params => {
    const { page = 1, pageSize = 10 } = params || {};
    return apiClient.get(
      `${ENDPOINTS.SUBSCRIPTIONS.LIST}?${QUERY_PARAMS.PAGE}=${page}&${QUERY_PARAMS.PAGE_SIZE}=${pageSize}`
    );
  };

  // Create subscription
  createSub: ServiceMethod<unknown> = data => {
    return apiClient.post(ENDPOINTS.SUBSCRIPTIONS.BASE, data);
  };

  // Update subscription
  updateSub: ServiceMethod<{ id: string | number; data: unknown }> = params => {
    const { id, data } = params || {};
    return apiClient.put(`${ENDPOINTS.SUBSCRIPTIONS.BASE}/${id}`, data);
  };

  // Delete subscription
  deleteSub: ServiceMethod<string | number> = id => {
    return apiClient.delete(`${ENDPOINTS.SUBSCRIPTIONS.BASE}/${id}`);
  };

  // Get subscription by duration
  getSubDuration: ServiceMethod<string> = duration => {
    return apiClient.get(
      `${ENDPOINTS.SUBSCRIPTIONS.BY_DURATION}?${QUERY_PARAMS.DURATION}=${duration}`
    );
  };

  // Get subscription by duration and type
  getSubByDurationAndType: ServiceMethod<{ duration: string; type: string }> =
    params => {
      const { duration, type } = params || {};
      return apiClient.get(
        `${ENDPOINTS.SUBSCRIPTIONS.BY_DURATION_AND_TYPE}?${QUERY_PARAMS.DURATION}=${duration}&type=${type}`
      );
    };
}

// Export singleton instance
export const subscriptionService = new SubscriptionService();
