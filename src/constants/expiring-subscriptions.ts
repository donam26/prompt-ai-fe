import type { ExpiringSubscriptionsFilterState } from "@/types/admin/expiring-subscriptions";

export const EXPIRING_SUBSCRIPTIONS_CONSTANTS = {
  // Initial filter state
  INITIAL_FILTERS: {
    search: "",
    days: 1,
    subscriptionType: undefined,
  } as ExpiringSubscriptionsFilterState,

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },
} as const;
