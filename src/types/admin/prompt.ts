import { Category, PromptFilterState } from "@/types";
import type {
  BaseFormProps,
  BaseFilterProps,
  BaseColumnHandlers,
} from "../base";

/**
 * Props for the PromptFilter component
 */
export interface PromptFilterProps extends BaseFilterProps<PromptFilterState> {
  readonly categories: Category[];
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
  readonly imageCard?: string;
  readonly isType?: string;
  readonly subType?: number;
  readonly industryId?: string;
  readonly topicId?: string;
  readonly isComingSoon?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
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
  filteredIndustries: Category[];
  isLoadingIndustries?: boolean;
  onSearchChange: (value: string) => void;
  onCategoriesChange: (values: string[]) => void;
  onPremiumChange: (value: string) => void;
  onIndustriesChange: (values: string[]) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onOnlyWithoutCategoryChange: (value: boolean) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}
