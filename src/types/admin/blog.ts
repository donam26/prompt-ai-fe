/**
 * Admin blog types
 *
 * Type definitions for admin blog management components and functionality.
 */

import type { Blog } from "@/types";
import type { BaseFilterProps, BaseColumnHandlers } from "../base";

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
  searchTerm: string;
  status: string;
  categoryId: string;
  dateRange: {
    from: string;
    to: string;
  };
}

/**
 * Props for the BlogFilter component
 */
export type BlogFilterProps = BaseFilterProps<BlogFilterState>;

/**
 * Context type for column handlers
 */
export type BlogColumnHandlers = BaseColumnHandlers<Blog>;
