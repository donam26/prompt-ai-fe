/**
 * Admin payment types
 *
 * Type definitions for admin payment management components and functionality.
 */

import type { Payment } from "@/lib/types";

/**
 * Filter state interface for payment filtering
 */
export interface PaymentFilterState {
  readonly searchTerm: string;
  readonly status: string; // "all" means no filter
  readonly method: string; // "all" means no filter
  readonly dateRange: {
    readonly from: string;
    readonly to: string;
  };
}

/**
 * Props for the PaymentHeader component
 */
export type PaymentHeaderProps = Record<string, never>;

/**
 * Props for the PaymentFilter component
 */
export interface PaymentFilterProps {
  readonly filters: PaymentFilterState;
  readonly onFilterChange: (filters: PaymentFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

/**
 * Context type for column handlers
 */
export interface PaymentColumnHandlers {
  readonly onView?: (payment: Payment) => void;
  readonly onDelete?: (id: string | number) => void;
}
