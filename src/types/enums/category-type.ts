/**
 * Category Type Enum
 * Defines the available category types in the system
 */
export enum CategoryType {
  FREE = "free",
  PREMIUM = "premium",
}

/**
 * Category Type Labels
 * Human-readable labels for category types
 */
export const CATEGORY_TYPE_LABELS = {
  [CategoryType.FREE]: "Free",
  [CategoryType.PREMIUM]: "Premium",
} as const;

/**
 * Category Type Options
 * For use in form selects and dropdowns
 */
export const CATEGORY_TYPE_OPTIONS = [
  { value: CategoryType.FREE, label: CATEGORY_TYPE_LABELS[CategoryType.FREE] },
  {
    value: CategoryType.PREMIUM,
    label: CATEGORY_TYPE_LABELS[CategoryType.PREMIUM],
  },
] as const;

/**
 * Type guard to check if a value is a valid category type
 */
export const isCategoryType = (value: string): value is CategoryType => {
  return Object.values(CategoryType).includes(value as CategoryType);
};

/**
 * Get category type label by value
 */
export const getCategoryTypeLabel = (type: CategoryType): string => {
  return CATEGORY_TYPE_LABELS[type] || type;
};
