/**
 * Admin section types
 *
 * Type definitions for admin section management components and functionality.
 */

import type { Section } from "@/lib/types";

/**
 * Form data structure for section creation/editing
 */
export interface SectionFormData {
  readonly name: string;
  readonly description: string;
  readonly status: "active" | "inactive";
  readonly order: number;
}

/**
 * Props for the SectionHeader component
 */
export interface SectionHeaderProps {
  readonly onAddSection: () => void;
}

/**
 * Filter state interface for section filtering
 */
export interface SectionFilterState {
  readonly searchTerm: string;
  readonly status: string; // "all" means no filter
}

/**
 * Props for the SectionFilter component
 */
export interface SectionFilterProps {
  readonly filters: SectionFilterState;
  readonly onFilterChange: (filters: SectionFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

/**
 * Context type for column handlers
 */
export interface SectionColumnHandlers {
  readonly onEdit?: (section: Section) => void;
  readonly onDelete?: (id: string | number) => void;
}
