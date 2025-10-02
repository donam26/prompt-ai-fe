import type { Category, Section } from "@/types";

/**
 * Product filter state interface
 */
export interface ProductFilterState {
  readonly searchTerm?: string;
  readonly sectionIds?: string[];
}

/**
 * Props for the ProductFilter component
 */
export interface ProductFilterProps {
  readonly filters: ProductFilterState;
  readonly sections: Section[];
  readonly onFilterChange: (filters: ProductFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

/**
 * Product form data interface
 */
export interface ProductFormData {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly status: string;
  readonly categoryId: string;
  readonly images?: string[];
  readonly tags?: string[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

/**
 * Props for the ProductForm component
 */
export interface ProductFormProps {
  readonly formData: ProductFormData;
  readonly errors: Partial<Record<keyof ProductFormData, string>>;
  readonly isLoading?: boolean;
  readonly onFieldChange: (
    field: keyof ProductFormData,
    value: string | number | string[]
  ) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
}

/**
 * Column handlers for the product table
 */
export interface ProductColumnHandlers {
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
}
