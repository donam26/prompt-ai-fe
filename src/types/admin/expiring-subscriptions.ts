import type { ExpiringSubscription } from "./expiring-subscription";

/**
 * Expiring subscriptions filter state interface
 */
export interface ExpiringSubscriptionsFilterState {
  readonly search: string;
  readonly days?: number;
  readonly subscriptionType?: number;
}

/**
 * Props for the ExpiringSubscriptionsFilter component
 */
export interface ExpiringSubscriptionsFilterProps {
  readonly filters: ExpiringSubscriptionsFilterState;
  readonly onFilterChange: (filters: ExpiringSubscriptionsFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

export type { ExpiringSubscription };
