/**
 * Admin industry types
 *
 * Type definitions for admin industry management components and functionality.
 */

import type { Industry } from "@/lib/types";

/**
 * Form data structure for industry creation/editing
 */
export interface IndustryFormData {
  readonly name: string;
  readonly description: string;
  readonly status: "active" | "inactive";
  readonly order: number;
}

/**
 * Props for the IndustryHeader component
 */
export interface IndustryHeaderProps {
  readonly onAddIndustry: () => void;
}

/**
 * Filter state interface for industry filtering
 */
export interface IndustryFilterState {
  readonly searchTerm: string;
  readonly status: string; // "all" means no filter
}

/**
 * Props for the IndustryFilter component
 */
export interface IndustryFilterProps {
  readonly filters: IndustryFilterState;
  readonly onFilterChange: (filters: IndustryFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

/**
 * Context type for column handlers
 */
export interface IndustryColumnHandlers {
  readonly onEdit?: (industry: Industry) => void;
  readonly onDelete?: (id: string | number) => void;
}
