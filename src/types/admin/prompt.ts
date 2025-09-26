/**
 * Prompt filter state interface
 */
export interface PromptFilterState {
  readonly searchTerm: string;
  readonly categoryId: string;
  readonly status: string;
  readonly isPremium: string;
  readonly tags: string[];
  readonly dateRange: {
    readonly from: string;
    readonly to: string;
  };
}

/**
 * Props for the PromptFilter component
 */
export interface PromptFilterProps {
  readonly filters: PromptFilterState;
  readonly onFilterChange: (filters: PromptFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
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
  readonly created_at?: string;
  readonly updated_at?: string;
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
