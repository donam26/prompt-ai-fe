import { Category, PromptFilterState } from "@/types";

/**
 * Props for the PromptFilter component
 */
export interface PromptFilterProps {
  readonly filters: PromptFilterState;
  readonly onFilterChange: (filters: PromptFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
  readonly categories: Category[];
  readonly industries: Category[];
}

/**
 * Prompt form data interface
 */
export interface PromptFormData {
  readonly title: string;
  readonly content: string;
  readonly categoryId: string;
  readonly status: string;
  readonly isPremium: boolean;
  readonly tags: string[];
  readonly description?: string;
  readonly image?: string;
  readonly image_card?: string;
  readonly is_type?: string;
  readonly sub_type?: number;
  readonly industry_id?: string;
  readonly topic_id?: string;
  readonly is_coming_soon?: boolean;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly category?: Category;
  readonly isPublic: boolean;
}

/**
 * Props for the PromptForm component
 */
export interface PromptFormProps {
  readonly formData: PromptFormData;
  readonly errors: Partial<Record<keyof PromptFormData, string>>;
  readonly isLoading?: boolean;
  readonly onFieldChange: (
    field: keyof PromptFormData,
    value: string | boolean | string[]
  ) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
}

/**
 * Column handlers for the prompt table
 */
export interface PromptColumnHandlers {
  onEdit: (prompt: any) => void;
  onDelete: (prompt: any) => void;
}

export interface IPromptFilterProps {
  filters: PromptFilterState;
  categories: Category[];
  industries: Category[];
  onSearchChange: (value: string) => void;
  onCategoriesChange: (values: string[]) => void;
  onPremiumChange: (value: string) => void;
  onIndustriesChange: (values: string[]) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}
