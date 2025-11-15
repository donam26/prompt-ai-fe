/**
 * Payment filter state interface
 */
export interface PaymentFilterState {
  readonly searchTerm: string;
  readonly status: string;
  readonly method: string;
  readonly subscriptionIds?: string[];
  readonly dateRange: {
    readonly from: string;
    readonly to: string;
  };
}

/**
 * Props for the PaymentFilter component
 */
export interface PaymentFilterProps {
  readonly filters: PaymentFilterState;
  readonly subscriptions?: any[];
  readonly subscriptionsLoading?: boolean;
  readonly subscriptionsSearch?: string;
  readonly onSubscriptionsSearch?: (search: string) => void;
  readonly onSubscriptionsScrollToBottom?: () => void;
  readonly hasMoreSubscriptions?: boolean;
  readonly onFilterChange: (filters: PaymentFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

/**
 * Payment form data interface
 */
export interface PaymentFormData {
  readonly amount: number;
  readonly method: string;
  readonly status: string;
  readonly description: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

/**
 * Props for the PaymentForm component
 */
export interface PaymentFormProps {
  readonly formData: PaymentFormData;
  readonly errors: Partial<Record<keyof PaymentFormData, string>>;
  readonly isLoading?: boolean;
  readonly onFieldChange: (
    field: keyof PaymentFormData,
    value: string | number
  ) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
}

/**
 * Column handlers for the payment table
 */
export interface PaymentColumnHandlers {
  onEdit: (payment: any) => void;
  onDelete: (payment: any) => void;
}
