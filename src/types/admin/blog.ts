export interface BlogFormData {
  readonly id?: string | number;
  readonly title: string;
  readonly content: string;
  readonly excerpt: string;
  readonly status: "draft" | "published" | "archived";
  readonly category: string;
  readonly tags: string[];
  readonly featuredImage?: string;
  readonly authorId: string;
}

/**
 * Props for the BlogHeader component
 */
export interface BlogHeaderProps {
  readonly onAddBlog: () => void;
}

/**
 * Filter state interface for blog filtering
 */
export interface BlogFilterState {
  searchTerm: string;
  dateFrom: string;
  dateTo: string;
}
