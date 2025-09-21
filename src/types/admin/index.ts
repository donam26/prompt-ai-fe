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
  IndustryFilterProps,
  FilterBadgeProps,
  ActiveFiltersProps,
} from "./category";

// User types
export type {
  UserFormData,
  UserHeaderProps,
  UserFormDialogProps,
  UserFormFieldsProps,
  UserFormActionsProps,
  UserTableProps,
  UserColumnHandlers,
  UserImageProps,
  UserStatusProps,
  UserActionsProps,
  UserFilterState,
  UserFilterProps,
  UserActiveFilterItem,
  UserFilterCardProps,
  UserSearchFilterProps,
  UserRoleFilterProps,
  UserStatusFilterProps,
  UserDateRangeFilterProps,
  UserActiveFiltersListProps,
  UserFilterBadgeProps,
  UserActiveFiltersProps,
} from "./user";

// Prompt types
export type {
  PromptFormData,
  PromptHeaderProps,
  PromptFormDialogProps,
  PromptFormFieldsProps,
  PromptFormActionsProps,
  PromptTableProps,
  PromptColumnHandlers,
  PromptImageProps,
  PromptStatusProps,
  PromptActionsProps,
  PromptFilterState,
  PromptFilterProps,
  PromptActiveFilterItem,
  PromptFilterCardProps,
  PromptSearchFilterProps,
  PromptCategoryFilterProps,
  PromptStatusFilterProps,
  PromptPremiumFilterProps,
  PromptTagsFilterProps,
  PromptActiveFiltersListProps,
  PromptFilterBadgeProps,
  PromptActiveFiltersProps,
} from "./prompt";

// Re-export common types from lib
export type { Category, Section, AdminStats } from "@/lib/types";
