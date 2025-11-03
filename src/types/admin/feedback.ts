/**
 * Feedback filter state interface
 */
export interface FeedbackFilterState {
  readonly searchTerm: string;
  readonly status: string;
  readonly dateFrom: string;
  readonly dateTo: string;
}

/**
 * Props for the FeedbackFilter component
 */
export interface FeedbackFilterProps {
  readonly filters: FeedbackFilterState;
  readonly onFilterChange: (filters: FeedbackFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}
