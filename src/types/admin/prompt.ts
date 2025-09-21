/**
 * Admin prompt types
 *
 * Type definitions for admin prompt management components and functionality.
 */

import type { Prompt } from "@/lib/types";

/**
 * Form data structure for prompt creation/editing
 */
export interface PromptFormData {
  readonly title: string;
  readonly content: string;
  readonly categoryId: string;
  readonly tags: string[];
  readonly isPublic: boolean;
  readonly isPremium: boolean;
  readonly description?: string;
  readonly image?: string;
}

/**
 * Props for the PromptHeader component
 */
export interface PromptHeaderProps {
  readonly onAddPrompt: () => void;
}

/**
 * Props for the PromptFormDialog component
 */
export interface PromptFormDialogProps {
  readonly isOpen: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly editingPrompt: Prompt | null;
  readonly formData: PromptFormData;
  readonly onFormDataChange: (data: PromptFormData) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly categories: any[];
  readonly onReset: () => void;
}

/**
 * Props for the PromptFormFields component
 */
export interface PromptFormFieldsProps {
  readonly formData: PromptFormData;
  readonly onFormDataChange: (data: PromptFormData) => void;
  readonly categories: any[];
}

/**
 * Props for the PromptFormActions component
 */
export interface PromptFormActionsProps {
  readonly onReset: () => void;
  readonly editingPrompt: Prompt | null;
}

/**
 * Props for the PromptTable component
 */
export interface PromptTableProps {
  readonly data: Prompt[];
  readonly columns: ReturnType<
    typeof import("../../app/admin/prompts/modules/table/columns").createPromptColumns
  >;
  readonly loading: boolean;
  readonly currentPage: number;
  readonly totalPages: number;
  readonly totalItems?: number;
  readonly pageSize?: number;
  readonly onPageChange: (page: number) => void;
}

/**
 * Context type for column handlers
 */
export interface PromptColumnHandlers {
  readonly onEdit?: (prompt: Prompt) => void;
  readonly onDelete?: (id: string | number) => void;
  readonly onView?: (prompt: Prompt) => void;
  readonly onTogglePublic?: (prompt: Prompt) => void;
}

/**
 * Props for the PromptImage component
 */
export interface PromptImageProps {
  readonly prompt: Prompt;
}

/**
 * Props for the PromptStatus component
 */
export interface PromptStatusProps {
  readonly prompt: Prompt;
}

/**
 * Props for the PromptActions component
 */
export interface PromptActionsProps {
  readonly prompt: Prompt;
  readonly handlers: PromptColumnHandlers;
}

/**
 * Filter state interface for prompt filtering
 */
export interface PromptFilterState {
  readonly searchTerm: string;
  readonly categoryId: string; // "all" means no filter
  readonly status: string; // "all" means no filter
  readonly isPremium: string; // "all", "premium", "free"
  readonly tags: readonly string[]; // array of tag IDs
}

/**
 * Props for the PromptFilter component
 */
export interface PromptFilterProps {
  readonly filters: PromptFilterState;
  readonly categories: any[];
  readonly onFilterChange: (filters: PromptFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

/**
 * Active filter item interface
 */
export interface PromptActiveFilterItem {
  readonly key: keyof PromptFilterState;
  readonly label: string;
  readonly value: string;
}

/**
 * Props for the PromptFilterCard component
 */
export interface PromptFilterCardProps {
  readonly filters: PromptFilterState;
  readonly categories: any[];
  readonly onSearchChange: (value: string) => void;
  readonly onCategoryChange: (value: string) => void;
  readonly onStatusChange: (value: string) => void;
  readonly onPremiumChange: (value: string) => void;
  readonly onTagsChange: (values: string[]) => void;
  readonly onClearFilters: () => void;
  readonly hasActiveFilters: boolean;
}

/**
 * Props for the PromptSearchFilter component
 */
export interface PromptSearchFilterProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * Props for the PromptCategoryFilter component
 */
export interface PromptCategoryFilterProps {
  readonly value: string;
  readonly categories: any[];
  readonly onChange: (value: string) => void;
}

/**
 * Props for the PromptStatusFilter component
 */
export interface PromptStatusFilterProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * Props for the PromptPremiumFilter component
 */
export interface PromptPremiumFilterProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * Props for the PromptTagsFilter component
 */
export interface PromptTagsFilterProps {
  readonly value: readonly string[];
  readonly onChange: (values: string[]) => void;
}

/**
 * Props for the PromptActiveFiltersList component
 */
export interface PromptActiveFiltersListProps {
  readonly activeFilters: PromptActiveFilterItem[];
  readonly onRemoveFilter: (key: keyof PromptFilterState) => void;
  readonly onClearAll: () => void;
  readonly totalActive: number;
}

/**
 * Props for the PromptFilterBadge component
 */
export interface PromptFilterBadgeProps {
  readonly label: string;
  readonly onRemove: () => void;
}

/**
 * Props for the PromptActiveFilters component
 */
export interface PromptActiveFiltersProps {
  readonly filters: PromptFilterState;
  readonly categories: any[];
  readonly onFilterChange: (filters: PromptFilterState) => void;
  readonly onClearAll: () => void;
  readonly onPageReset?: () => void;
}
