/**
 * Admin category types
 *
 * Type definitions for admin category management components and functionality.
 */

import type { Category, Section } from "@/lib/types";

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
 * Props for the CategoryTable component
 */
export interface CategoryTableProps {
  readonly data: Category[];
  readonly columns: ReturnType<
    typeof import("../../app/admin/category/(module)/column").createCategoryColumns
  >;
  readonly loading: boolean;
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
}

/**
 * Context type for column handlers
 */
export interface ColumnHandlers {
  readonly onEdit?: (category: Category) => void;
  readonly onDelete?: (id: string | number) => void;
}

/**
 * Props for the CategoryImage component
 */
export interface CategoryImageProps {
  readonly category: Category;
}

/**
 * Props for the CategoryStatus component
 */
export interface CategoryStatusProps {
  readonly category: Category;
}

/**
 * Props for the CategoryActions component
 */
export interface CategoryActionsProps {
  readonly category: Category;
  readonly handlers: ColumnHandlers;
}

/**
 * Filter state interface for category filtering
 */
export interface FilterState {
  readonly searchTerm: string;
  readonly sectionId: string; // "all" means no filter
  readonly status: string; // "all" means no filter
}

/**
 * Props for the CategoryFilter component
 */
export interface CategoryFilterProps {
  readonly sections: Section[];
  readonly onFilterChange: (filters: FilterState) => void;
  readonly onClearFilters: () => void;
  readonly initialFilters?: Partial<FilterState>;
  readonly className?: string;
  readonly showActiveFilters?: boolean;
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
  readonly sections: Section[];
  readonly onFilterChange: (key: keyof FilterState, value: string) => void;
  readonly onClearFilters: () => void;
  readonly hasActiveFilters: boolean;
}

/**
 * Props for the SearchFilter component
 */
export interface SearchFilterProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * Props for the SectionFilter component
 */
export interface SectionFilterProps {
  readonly value: string;
  readonly sections: Section[];
  readonly onChange: (value: string) => void;
}

/**
 * Props for the StatusFilter component
 */
export interface StatusFilterProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * Props for the ActiveFiltersList component
 */
export interface ActiveFiltersListProps {
  readonly activeFilters: ActiveFilterItem[];
  readonly onRemoveFilter: (key: keyof FilterState) => void;
  readonly onClearAll: () => void;
}
