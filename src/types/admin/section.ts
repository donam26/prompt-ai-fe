import type { Section } from "@/types";

/**
 * Section filter state interface
 */
export interface SectionFilterState {
  readonly searchTerm: string;
}

/**
 * Props for the SectionFilter component
 */
export interface SectionFilterProps {
  readonly filters: SectionFilterState;
  readonly onFilterChange: (filters: SectionFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

/**
 * Props for the SectionHeader component
 */
export interface SectionHeaderProps {
  readonly onAddSection: () => void;
  readonly className?: string;
}

/**
 * Section form data interface
 */
export interface SectionFormData {
  readonly id?: string | number;
  readonly name: string;
  readonly description?: string;
  readonly status: string;
}

/**
 * Props for the SectionForm component
 */
export interface SectionFormProps {
  readonly formData: SectionFormData;
  readonly errors: Partial<Record<keyof SectionFormData, string>>;
  readonly isLoading?: boolean;
  readonly onFieldChange: (field: keyof SectionFormData, value: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
}

/**
 * Props for the SectionFormModal component
 */
export interface SectionFormModalProps {
  readonly section?: Section;
  readonly onSubmit: (sectionData: SectionFormData) => void;
  readonly onCancel: () => void;
  readonly isLoading?: boolean;
  readonly errors?: Record<string, string>;
  readonly isOpen?: boolean;
}

/**
 * Props for the SectionFormFields component
 */
export interface SectionFormFieldsProps {
  readonly formData: SectionFormData;
  readonly errors: Partial<Record<keyof SectionFormData, string>>;
  readonly onFieldChange: (field: keyof SectionFormData, value: string) => void;
}

/**
 * Props for the SectionFormActions component
 */
export interface SectionFormActionsProps {
  readonly onCancel: () => void;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly isLoading?: boolean;
}

/**
 * Column handlers for the section table
 */
export interface SectionColumnHandlers {
  onEditAction: (section: Section) => void;
  onDeleteAction: (section: Section) => void;
}
