/**
 * Admin blog types
 *
 * Type definitions for admin blog management components and functionality.
 */

import type { Blog } from "@/lib/types";

/**
 * Form data structure for blog creation/editing
 */
export interface BlogFormData {
  readonly id?: string | number;
  readonly title: string;
  readonly content: string;
  readonly excerpt: string;
  readonly status: "draft" | "published" | "archived";
  readonly category: string;
  readonly tags: string[];
  readonly featuredImage?: string;
  readonly authorId: string;
}

/**
 * Props for the BlogHeader component
 */
export interface BlogHeaderProps {
  readonly onAddBlog: () => void;
}

/**
 * Filter state interface for blog filtering
 */
export interface BlogFilterState {
  readonly searchTerm: string;
  readonly dateRange: {
    readonly from: string;
    readonly to: string;
  };
}

/**
 * Props for the BlogFilter component
 */
export interface BlogFilterProps {
  readonly filters: BlogFilterState;
  readonly onFilterChange: (filters: BlogFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

/**
 * Context type for column handlers
 */
export interface BlogColumnHandlers {
  readonly onEdit?: (blog: Blog) => void;
  readonly onDelete?: (id: string | number) => void;
  readonly onView?: (blog: Blog) => void;
}
