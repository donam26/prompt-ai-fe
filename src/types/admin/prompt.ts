import { Category } from "@/types";
import type { PromptFilterState } from "@/types/entities/prompt";
import type {
  BaseFormProps,
  BaseFilterProps,
  BaseColumnHandlers,
} from "../base";

// Re-export PromptFilterState for admin usage
export type { PromptFilterState };

/**
 * Props for the PromptFilter component
 */
export interface PromptFilterProps extends BaseFilterProps<PromptFilterState> {
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
export interface PromptFormProps extends BaseFormProps<PromptFormData> {
  readonly onFieldChange: (
    field: keyof PromptFormData,
    value: string | boolean | string[]
  ) => void;
}

/**
 * Column handlers for the prompt table
 */
export type PromptColumnHandlers = BaseColumnHandlers;

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
