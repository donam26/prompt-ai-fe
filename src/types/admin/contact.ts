/**
 * Contact filter state interface
 */
export interface ContactFilterState {
  readonly searchTerm: string;
  readonly status: string;
  readonly type: string;
  readonly dateFrom: string;
  readonly dateTo: string;
}

/**
 * Props for the ContactFilter component
 */
export interface ContactFilterProps {
  readonly filters: ContactFilterState;
  readonly onFilterChange: (filters: ContactFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

/**
 * Contact form data interface
 */
export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly phoneNumber?: string | null;
  readonly message: string;
  readonly status?: number | null;
  readonly reply?: string | null;
  readonly type?: number | null;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

/**
 * Props for the ContactForm component
 */
export interface ContactFormProps {
  readonly formData: ContactFormData;
  readonly errors: Partial<Record<keyof ContactFormData, string>>;
  readonly isLoading?: boolean;
  readonly onFieldChange: (field: keyof ContactFormData, value: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
}

/**
 * Column handlers for the contact table
 */
export interface ContactColumnHandlers {
  onEdit: (contact: any) => void;
  onDelete: (contact: any) => void;
}
