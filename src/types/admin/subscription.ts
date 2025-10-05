import type { Subscription } from "../entities/user";

export interface SubscriptionFilterState {
  readonly searchTerm: string;
}

export interface SubscriptionFilterProps {
  readonly filters: SubscriptionFilterState;
  readonly onFilterChange: (filters: SubscriptionFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

export interface SubscriptionHeaderProps {
  readonly onAddSubscription: () => void;
  readonly filters: SubscriptionFilterState;
  readonly disabled?: boolean;
  readonly className?: string;
}

export interface ContentSubscription {
  readonly id?: number;
  readonly content: string;
  readonly included: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

export interface SubscriptionFormData {
  readonly id?: string | number;
  readonly name: string;
  readonly type: number;
  readonly duration: number;
  readonly billingCycle: string;
  readonly price: string;
  readonly priceYear?: string | null;
  readonly isPopular?: boolean;
  readonly description?: string;
  readonly descriptionPerYear?: string | null;
  readonly pricePerMonthYear?: string | null;
  readonly priceTotalYearly?: string | null;
  readonly imageDiscount?: string;
  readonly contentSubscriptions?: ContentSubscription[];
  readonly currency?: string;
  readonly period?: number;
  readonly isEnterprise?: boolean;
  readonly buttonText?: string;
  readonly buttonVariant?: "default" | "outline" | "secondary";
  readonly ctaText?: string;
  readonly badge?: string;
}

export interface SubscriptionFormModalProps {
  readonly subscription?: Subscription;
  readonly onSubmit: (subscriptionData: SubscriptionFormData) => void;
  readonly onCancel: () => void;
  readonly isLoading?: boolean;
  readonly errors?: Record<string, string>;
  readonly isOpen?: boolean;
}

export interface SubscriptionFormProps {
  readonly subscription?: Subscription;
  readonly onSubmit: (subscriptionData: SubscriptionFormData) => void;
  readonly onCancel: () => void;
  readonly isLoading?: boolean;
  readonly isEditMode?: boolean;
  readonly isDataLoading?: boolean;
}

export interface SubscriptionDetailModalProps {
  readonly subscription?: Subscription;
  readonly onClose: () => void;
  readonly isOpen?: boolean;
}

export interface SubscriptionColumnHandlers {
  onEdit: (subscription: Subscription) => void;
  onDelete: (subscription: Subscription) => void;
}
