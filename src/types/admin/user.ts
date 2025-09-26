/**
 * User filter state interface
 */
export interface UserFilterState {
  readonly searchTerm: string;
  readonly role: string;
  readonly status: string;
  readonly dateRange: {
    readonly from: string;
    readonly to: string;
  };
}

/**
 * Props for the UserFilter component
 */
export interface UserFilterProps {
  readonly filters: UserFilterState;
  readonly onFilterChange: (filters: UserFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

/**
 * User form data interface
 */
export interface UserFormData {
  readonly full_name: string;
  readonly email: string;
  readonly role: string;
  readonly status: string;
  readonly created_at?: string;
  readonly updated_at?: string;
}

/**
 * Props for the UserForm component
 */
export interface UserFormProps {
  readonly formData: UserFormData;
  readonly errors: Partial<Record<keyof UserFormData, string>>;
  readonly isLoading?: boolean;
  readonly onFieldChange: (field: keyof UserFormData, value: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
}

/**
 * Column handlers for the user table
 */
export interface UserColumnHandlers {
  onEdit: (user: any) => void;
  onDelete: (user: any) => void;
  onView: (user: any) => void;
}
