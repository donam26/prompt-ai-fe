import type { Category } from "@/types";

/**
 * Industry filter state interface
 */
export interface IndustryFilterState {
  readonly searchTerm?: string;
  readonly categoryIds?: string[];
}

/**
 * Props for the IndustryFilter component
 */
export interface IndustryFilterProps {
  readonly filters: IndustryFilterState;
  readonly categories: Category[];
  readonly onFilterChange: (filters: IndustryFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

/**
 * Industry form data interface
 */
export interface IndustryFormData {
  readonly name: string;
  readonly description: string;
  readonly status: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

/**
 * Props for the IndustryForm component
 */
export interface IndustryFormProps {
  readonly formData: IndustryFormData;
  readonly errors: Partial<Record<keyof IndustryFormData, string>>;
  readonly isLoading?: boolean;
  readonly onFieldChange: (
    field: keyof IndustryFormData,
    value: string
  ) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
}

/**
 * Column handlers for the industry table
 */
export interface IndustryColumnHandlers {
  onEdit: (industry: any) => void;
  onDelete: (industry: any) => void;
}
