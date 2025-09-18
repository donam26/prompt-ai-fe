/**
 * Admin types module exports
 *
 * This module provides all type definitions and interfaces
 * for the admin interface components and functionality.
 */

// Layout types
export type { AdminLayoutProps } from "./layout";

// Dashboard types
export type {
  PaginatedResponse,
  SimpleResponse,
  DashboardStats,
  StatsGridProps,
} from "./dashboard";

// Category types
export type {
  CategoryFormData,
  CategoryHeaderProps,
  CategoryFormDialogProps,
  CategoryFormFieldsProps,
  CategoryFormActionsProps,
  CategoryTableProps,
  ColumnHandlers,
  CategoryImageProps,
  CategoryStatusProps,
  CategoryActionsProps,
  FilterState,
  CategoryFilterProps,
  ActiveFilterItem,
  FilterCardProps,
  SearchFilterProps,
  SectionFilterProps,
  StatusFilterProps,
  ActiveFiltersListProps,
} from "./category";

// Re-export common types from lib
export type { Category, Section, AdminStats } from "@/lib/types";
