import type { BlogCategory } from "@/types/entities/blog";

/**
 * Blog Category filter state interface
 */
export interface BlogCategoryFilterState {
  readonly searchTerm: string;
}

/**
 * Props for the BlogCategoryFilter component
 */
export interface BlogCategoryFilterProps {
  readonly filters: BlogCategoryFilterState;
  readonly onFilterChange: (filters: BlogCategoryFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

/**
 * Props for the BlogCategoryHeader component
 */
export interface BlogCategoryHeaderProps {
  readonly onAddBlogCategory: () => void;
  readonly className?: string;
}

/**
 * Blog Category form data interface
 */
export interface BlogCategoryFormData {
  readonly id?: string | number;
  readonly name: string;
  readonly description?: string;
}

/**
 * Props for the BlogCategoryFormModal component
 */
export interface BlogCategoryFormModalProps {
  readonly blogCategory?: BlogCategory;
  readonly onSubmit: (blogCategoryData: BlogCategoryFormData) => void;
  readonly onCancel: () => void;
  readonly isLoading?: boolean;
  readonly errors?: Record<string, string>;
  readonly isOpen?: boolean;
}

/**
 * Column handlers for the blog category table
 */
export interface BlogCategoryColumnHandlers {
  onEditAction: (blogCategory: BlogCategory) => void;
  onDeleteAction: (blogCategory: BlogCategory) => void;
}
