/**
 * Admin category types
 *
 * Type definitions for admin category management components and functionality.
 */

import type { Category, Section, Industry } from "@/lib/types";

/**
 * Form data structure for category creation/editing
 */
export interface CategoryFormData {
  readonly name: string;
  readonly description: string;
  readonly section_id: string;
  readonly is_coming_soon: boolean;
}

/**
 * Props for the CategoryHeader component
 */
export interface CategoryHeaderProps {
  readonly onAddCategory: () => void;
}

/**
 * Props for the CategoryFormDialog component
 */
export interface CategoryFormDialogProps {
  readonly isOpen: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly editingCategory: Category | null;
  readonly formData: CategoryFormData;
  readonly onFormDataChange: (data: CategoryFormData) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly sections: Section[];
  readonly onReset: () => void;
}

/**
 * Props for the CategoryFormFields component
 */
export interface CategoryFormFieldsProps {
  readonly formData: CategoryFormData;
  readonly onFormDataChange: (data: CategoryFormData) => void;
  readonly sections: Section[];
}

/**
 * Props for the CategoryFormActions component
 */
export interface CategoryFormActionsProps {
  readonly onReset: () => void;
  readonly editingCategory: Category | null;
}

/**
 * Context type for column handlers
 */
export interface ColumnHandlers {
  readonly onEdit?: (category: Category) => void;
  readonly onDelete?: (category: Category) => void;
}

/**
 * Filter state interface for category filtering
 */
export interface FilterState {
  searchTerm: string;
  sectionId: string; // "all" means no filter
  status: string; // "all" means no filter
  industryIds: string[]; // array of industry IDs
}

/**
 * Props for the CategoryFilter component
 */
export interface CategoryFilterProps {
  readonly filters: Partial<FilterState>;
  readonly sections: Section[];
  readonly industries: Industry[];
  readonly onFilterChange: (filters: FilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

/**
 * Active filter item interface
 */
export interface ActiveFilterItem {
  readonly key: keyof FilterState;
  readonly label: string;
  readonly value: string;
}

/**
 * Props for the FilterCard component
 */
export interface FilterCardProps {
  readonly filters: FilterState;
  readonly industries: Industry[];
  readonly onSearchChange: (value: string) => void;
  readonly onStatusChange: (value: string) => void;
  readonly onIndustryChange: (values: string[]) => void;
  readonly onClearFilters: () => void;
  readonly hasActiveFilters: boolean;
}

/**
 * Props for the StatusFilter component
 */
export interface StatusFilterProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * Props for the FilterBadge component
 */
export interface FilterBadgeProps {
  readonly label: string;
  readonly onRemove: () => void;
}

/**
 * Props for the ActiveFilters component
 */
export interface ActiveFiltersProps {
  readonly filters: FilterState;
  readonly industries: Industry[];
  readonly onFilterChange: (filters: FilterState) => void;
  readonly onClearAll: () => void;
  readonly onPageReset?: () => void;
}
